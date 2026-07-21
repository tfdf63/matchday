#!/usr/bin/env python3
"""Парсит atoms_drivers_report_*.xlsx → src/data/busfans/dataset.json"""

from __future__ import annotations

import json
import re
import unicodedata
import zipfile
import xml.etree.ElementTree as ET
from collections import defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = ROOT / "src" / "data" / "busfans" / "raw"
OUT_JSON = ROOT / "src" / "data" / "busfans" / "dataset.json"
SCHEDULE_JSON = ROOT / "akron-schedule.json"
GAMES_TS = ROOT / "src" / "data" / "games.ts"

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
DATE_RANGE_RE = re.compile(
	r"^(?P<head>.+?)\s*\((?P<from>\d{2}\.\d{2}\.\d{4})\s*[—\-]\s*(?P<to>\d{2}\.\d{2}\.\d{4})\)\s*$"
)
BUS_TAIL_RE = re.compile(
	r"^(?P<title>.+?)\s+\((?P<busInfo>Автобус[^)]*|Заказной[^)]*)\)\s*$",
	re.IGNORECASE,
)


def slugify(text: str) -> str:
	text = text.lower().replace("ё", "е")
	text = unicodedata.normalize("NFKD", text)
	text = re.sub(r"[^a-z0-9а-я]+", "-", text, flags=re.IGNORECASE)
	text = re.sub(r"-+", "-", text).strip("-")
	# keep latin/digits for stable ids
	trans = {
		"а": "a",
		"б": "b",
		"в": "v",
		"г": "g",
		"д": "d",
		"е": "e",
		"ж": "zh",
		"з": "z",
		"и": "i",
		"й": "y",
		"к": "k",
		"л": "l",
		"м": "m",
		"н": "n",
		"о": "o",
		"п": "p",
		"р": "r",
		"с": "s",
		"т": "t",
		"у": "u",
		"ф": "f",
		"х": "h",
		"ц": "c",
		"ч": "ch",
		"ш": "sh",
		"щ": "sch",
		"ъ": "",
		"ы": "y",
		"ь": "",
		"э": "e",
		"ю": "yu",
		"я": "ya",
	}
	out = []
	for ch in text:
		out.append(trans.get(ch, ch if ch.isascii() else ""))
	s = "".join(out)
	s = re.sub(r"-+", "-", s).strip("-")
	return s or "item"


def col_row(ref: str) -> tuple[str, int]:
	m = re.match(r"([A-Z]+)(\d+)", ref)
	assert m
	return m.group(1), int(m.group(2))


def read_sheet_rows(path: Path) -> list[list[str]]:
	with zipfile.ZipFile(path) as z:
		ss: list[str] = []
		if "xl/sharedStrings.xml" in z.namelist():
			root = ET.fromstring(z.read("xl/sharedStrings.xml"))
			for si in root.findall("m:si", NS):
				texts = [t.text or "" for t in si.findall(".//m:t", NS)]
				ss.append("".join(texts))

		root = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))
		grid: dict[tuple[int, str], str] = {}
		max_r = 0
		cols: set[str] = set()
		for row in root.findall("m:sheetData/m:row", NS):
			for c in row.findall("m:c", NS):
				ref = c.get("r")
				if not ref:
					continue
				col, r = col_row(ref)
				t = c.get("t")
				v_el = c.find("m:v", NS)
				is_el = c.find("m:is", NS)
				val = ""
				if t == "inlineStr" and is_el is not None:
					val = "".join(x.text or "" for x in is_el.findall(".//m:t", NS))
				elif v_el is not None:
					val = v_el.text or ""
					if t == "s" and val.isdigit():
						val = ss[int(val)]
				grid[(r, col)] = val.strip()
				max_r = max(max_r, r)
				cols.add(col)

		col_order = sorted(cols, key=lambda x: (len(x), x))
		return [[grid.get((r, c), "") for c in col_order] for r in range(1, max_r + 1)]


def parse_meta(meta: str) -> dict:
	m = DATE_RANGE_RE.match(meta.strip())
	if not m:
		raise ValueError(f"Не удалось разобрать мета-строку: {meta!r}")
	head = m.group("head").strip()
	date_from = datetime.strptime(m.group("from"), "%d.%m.%Y").date()
	date_to = datetime.strptime(m.group("to"), "%d.%m.%Y").date()
	bus_info = None
	title = head
	bm = BUS_TAIL_RE.match(head)
	if bm:
		title = bm.group("title").strip()
		bus_info = bm.group("busInfo").strip()
	return {
		"matchTitle": title,
		"busInfo": bus_info,
		"dateFrom": date_from.isoformat(),
		"dateTo": date_to.isoformat(),
		"dateLabel": date_from.strftime("%d.%m.%Y"),
	}


def parse_teams(title: str) -> tuple[str, str, str]:
	# "Акрон - Ростов" / "Спартак х Акрон"
	parts = re.split(r"\s+[xхXХ]\s+|\s+[-–—]\s+", title, maxsplit=1)
	if len(parts) != 2:
		return title, "", "unknown"
	home, away = parts[0].strip(), parts[1].strip()
	if home.lower() == "акрон":
		venue = "home"
	elif away.lower() == "акрон":
		venue = "away"
	else:
		venue = "unknown"
	return home, away, venue


def header_map(row: list[str]) -> dict[str, int]:
	mapping = {}
	for i, cell in enumerate(row):
		key = cell.strip().lower()
		if not key:
			continue
		mapping[key] = i
	return mapping


def find_col(hmap: dict[str, int], *names: str) -> int | None:
	for n in names:
		if n in hmap:
			return hmap[n]
	return None


def find_col_contains(hmap: dict[str, int], *substrings: str) -> int | None:
	for sub in substrings:
		for key, idx in hmap.items():
			if sub in key:
				return idx
	return None


def parse_birth_date(raw: str) -> str | None:
	raw = raw.strip()
	if not raw:
		return None
	m = re.match(r"^(\d{1,2})\.(\d{1,2})\.(\d{4})$", raw)
	if m:
		d, mo, y = int(m.group(1)), int(m.group(2)), int(m.group(3))
		return f"{y:04d}-{mo:02d}-{d:02d}"
	m = re.match(r"^(\d{4})-(\d{2})-(\d{2})$", raw)
	if m:
		return raw
	try:
		serial = float(raw.replace(",", "."))
	except ValueError:
		return None
	if serial <= 0:
		return None
	from datetime import date, timedelta

	birth = date(1899, 12, 30) + timedelta(days=int(serial))
	return birth.isoformat()


def parse_bus_label(bus_info: str | None, source_file: str) -> tuple[str, int | None]:
	if not bus_info:
		return "Автобус", None
	m = re.search(r"Автобус\s*(\d+)", bus_info, re.IGNORECASE)
	num = int(m.group(1)) if m else None
	return bus_info, num


def normalize_team(name: str) -> str:
	n = re.sub(r"\s+", " ", name.strip().lower().replace("ё", "е"))
	aliases = {
		"динамо": "динамо мск",
		"динамо москва": "динамо мск",
		"динамо (махачкала)": "динамо мх",
		"динамо махачкала": "динамо мх",
		"крылья": "крылья советов",
	}
	return aliases.get(n, n)


def load_games_ts_index() -> dict[str, dict]:
	"""Индекс матчей из src/data/games.ts (календарь сайта)."""
	if not GAMES_TS.exists():
		return {}
	text = GAMES_TS.read_text(encoding="utf-8")
	# Убираем блочные и строчные комментарии
	text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
	text = re.sub(r"^\s*//.*$", "", text, flags=re.M)

	index: dict[str, dict] = {}
	# Режем по id: 'N' — устойчиво к вложенным { priceIncreaseDates }
	chunks = re.split(r"(?=^\s*id:\s*')", text, flags=re.M)
	for chunk in chunks:
		if "dateIso:" not in chunk or "homeTeam:" not in chunk:
			continue
		fields: dict[str, str] = {}
		for key in (
			"id",
			"homeTeam",
			"awayTeam",
			"dateIso",
			"time",
			"venue",
			"leagueInfo",
			"seasonTour",
			"dateCard",
			"fanIdStatus",
		):
			m = re.search(rf"{key}:\s*'([^']*)'", chunk)
			if m:
				fields[key] = m.group(1)
		if not fields.get("dateIso") or not fields.get("homeTeam"):
			continue
		home = fields["homeTeam"]
		away = fields.get("awayTeam", "")
		key = f"{fields['dateIso']}|{normalize_team(home)}|{normalize_team(away)}"
		index[key] = fields
		index.setdefault(f"date:{fields['dateIso']}", fields)
	return index


def load_schedule_index() -> dict[str, dict]:
	if not SCHEDULE_JSON.exists():
		return {}
	data = json.loads(SCHEDULE_JSON.read_text(encoding="utf-8"))
	index: dict[str, dict] = {}
	for match in data.get("matches", []):
		if match.get("team", {}).get("code") != "akron":
			continue
		kick = (match.get("kickoff") or {}).get("date")
		if not kick:
			kick = (match.get("calendarWindow") or {}).get("from")
		if not kick:
			continue
		home = match.get("homeTeam") or ""
		away = match.get("awayTeam") or ""
		key = f"{kick}|{normalize_team(home)}|{normalize_team(away)}"
		index[key] = match
		index.setdefault(f"date:{kick}", match)
	return index


def resolve_calendar(
	date_iso: str,
	home: str,
	away: str,
	games_index: dict[str, dict],
	schedule_index: dict[str, dict],
) -> dict:
	"""Сначала games.ts, затем akron-schedule.json."""
	key = f"{date_iso}|{normalize_team(home)}|{normalize_team(away)}"
	game = games_index.get(key) or games_index.get(f"date:{date_iso}")
	sched = schedule_index.get(key) or schedule_index.get(f"date:{date_iso}")

	out: dict = {
		"time": None,
		"scheduleMatchId": None,
		"gameId": None,
		"tournament": None,
		"leagueInfo": None,
		"seasonTour": None,
		"dateCard": None,
		"venue": None,
		"fanIdStatus": None,
	}
	if game:
		out["gameId"] = game.get("id")
		out["time"] = game.get("time")
		out["leagueInfo"] = game.get("leagueInfo")
		out["seasonTour"] = game.get("seasonTour")
		out["dateCard"] = game.get("dateCard")
		out["venue"] = game.get("venue")
		out["fanIdStatus"] = game.get("fanIdStatus")
		if game.get("leagueInfo"):
			info = game["leagueInfo"].lower()
			if "кубок" in info:
				out["tournament"] = "Кубок"
			elif "премьер" in info or "рпл" in info:
				out["tournament"] = "РПЛ"
	if sched:
		out["scheduleMatchId"] = sched.get("id")
		if not out["time"] and (sched.get("kickoff") or {}).get("time"):
			out["time"] = f"SAMT {sched['kickoff']['time']}"
		if not out["tournament"]:
			out["tournament"] = (sched.get("tournament") or {}).get("shortName")
		if not out["venue"] and sched.get("venueType") in ("home", "away"):
			out["venue"] = sched["venueType"]

	# Правило как в games.ts: все матчи РПЛ (дома и в гостях) — с FAN ID.
	# Кубок / переходные — без FAN ID. Без календаря для busfans считаем РПЛ.
	league = (out.get("leagueInfo") or "").lower()
	tournament = (out.get("tournament") or "").strip()
	is_cup = tournament == "Кубок" or "кубок" in league
	is_rpl = (
		tournament == "РПЛ"
		or "премьер" in league
		or ("рпл" in league and "переходн" not in league)
	)
	if is_cup or "переходн" in league:
		out["fanIdStatus"] = "Без fan id"
		if is_cup:
			out["tournament"] = "Кубок"
	elif is_rpl or not tournament:
		out["tournament"] = "РПЛ"
		out["fanIdStatus"] = "Fan id"

	return out


def main() -> None:
	files = sorted(RAW_DIR.glob("*.xlsx"))
	if not files:
		raise SystemExit(f"Нет XLSX в {RAW_DIR}")

	games_index = load_games_ts_index()
	schedule_index = load_schedule_index()
	print(
		f"calendar: games.ts={len([k for k in games_index if not k.startswith('date:')])} "
		f"schedule={len([k for k in schedule_index if not k.startswith('date:')])}"
	)

	events: dict[str, dict] = {}
	manifests: list[dict] = []
	passengers: list[dict] = []

	for path in files:
		rows = read_sheet_rows(path)
		if len(rows) < 4:
			print(f"skip {path.name}: слишком мало строк")
			continue
		meta_raw = next((c for c in rows[0] if c.strip()), "")
		if not meta_raw:
			print(f"skip {path.name}: пустая мета")
			continue
		meta = parse_meta(meta_raw)
		home, away, venue = parse_teams(meta["matchTitle"])
		event_id = f"{meta['dateFrom']}-{slugify(meta['matchTitle'])}"

		if event_id not in events:
			cal = resolve_calendar(
				meta["dateFrom"], home, away, games_index, schedule_index
			)
			events[event_id] = {
				"id": event_id,
				"title": meta["matchTitle"],
				"homeTeam": home,
				"awayTeam": away,
				"venue": cal.get("venue") or venue,
				"dateIso": meta["dateFrom"],
				"dateToIso": meta["dateTo"],
				"dateLabel": meta["dateLabel"],
				"dateCard": cal.get("dateCard"),
				"time": cal.get("time"),
				"gameId": cal.get("gameId"),
				"scheduleMatchId": cal.get("scheduleMatchId"),
				"tournament": cal.get("tournament"),
				"leagueInfo": cal.get("leagueInfo"),
				"seasonTour": cal.get("seasonTour"),
				"fanIdStatus": cal.get("fanIdStatus"),
			}

		bus_label, bus_no = parse_bus_label(meta["busInfo"], path.name)
		manifest_id = f"{event_id}-bus-{bus_no if bus_no is not None else slugify(bus_label)}"
		# avoid collisions
		if any(m["id"] == manifest_id for m in manifests):
			manifest_id = f"{manifest_id}-{slugify(path.stem)}"

		hmap = header_map(rows[2])
		fio_i = find_col(hmap, "фио")
		seat_i = find_col(hmap, "место")
		order_i = find_col(hmap, "номер заказа")
		birth_i = find_col(hmap, "дата рождения") or find_col_contains(
			hmap, "дата рожд", "рождения"
		)
		board_i = find_col(hmap, "место посадки в автобус", "место посадки")
		phone_i = find_col(hmap, "телефон туриста")

		if fio_i is None:
			print(f"skip {path.name}: нет колонки ФИО")
			continue

		manifest_passengers: list[dict] = []
		for ridx, row in enumerate(rows[3:], start=4):
			full_name = (row[fio_i] if fio_i < len(row) else "").strip()
			if not full_name or full_name.lower() in {"фио", "итого"}:
				continue
			if full_name.isdigit():
				continue
			seat = (row[seat_i] if seat_i is not None and seat_i < len(row) else "").strip()
			order_id = (
				row[order_i] if order_i is not None and order_i < len(row) else ""
			).strip()
			boarding = (
				row[board_i] if board_i is not None and board_i < len(row) else ""
			).strip()
			phone = (
				row[phone_i] if phone_i is not None and phone_i < len(row) else ""
			).strip()
			birth_raw = (
				row[birth_i] if birth_i is not None and birth_i < len(row) else ""
			).strip()
			birth_date_iso = parse_birth_date(birth_raw)

			manifest_passengers.append(
				{
					"eventId": event_id,
					"manifestId": manifest_id,
					"fullName": full_name,
					"seatNo": seat or None,
					"orderId": order_id or None,
					"birthDateIso": birth_date_iso,
					"boardingPlace": boarding or None,
					"phone": phone or None,
					"sourceFile": path.name,
					"sourceRow": ridx,
					"seq": 0,
				}
			)

		# sort A→Я, renumber seq
		manifest_passengers.sort(key=lambda p: p["fullName"].casefold())
		for i, p in enumerate(manifest_passengers, start=1):
			p["seq"] = i

		# Маршрут: уникальные остановки в порядке первого появления
		boarding_stops: list[str] = []
		seen_stops: set[str] = set()
		for p in manifest_passengers:
			stop = (p.get("boardingPlace") or "").strip().rstrip(",")
			if not stop or stop in seen_stops:
				continue
			seen_stops.add(stop)
			boarding_stops.append(stop)

		manifests.append(
			{
				"id": manifest_id,
				"eventId": event_id,
				"label": bus_label,
				"busNo": bus_no,
				"sourceFile": path.name,
				"passengerCount": len(manifest_passengers),
				"seatsAssigned": sum(1 for p in manifest_passengers if p["seatNo"]),
				"boardingStops": boarding_stops,
			}
		)
		passengers.extend(manifest_passengers)
		print(f"ok {path.name}: {event_id} / {bus_label} → {len(manifest_passengers)}")

	# sort manifests by busNo then label
	manifests.sort(key=lambda m: (m["eventId"], m["busNo"] is None, m["busNo"] or 0, m["label"]))

	event_list = []
	by_event_manifests = defaultdict(list)
	by_event_passengers = defaultdict(list)
	for m in manifests:
		by_event_manifests[m["eventId"]].append(m)
	for p in passengers:
		by_event_passengers[p["eventId"]].append(p)

	for eid, ev in sorted(events.items(), key=lambda x: x[1]["dateIso"], reverse=True):
		ms = by_event_manifests[eid]
		ps = by_event_passengers[eid]
		event_list.append(
			{
				**ev,
				"busCount": len(ms),
				"passengerCount": len(ps),
				"seatsAssigned": sum(1 for p in ps if p["seatNo"]),
			}
		)

	dataset = {
		"meta": {
			"generatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
			"sourceDir": str(RAW_DIR.relative_to(ROOT)),
			"eventsCount": len(event_list),
			"manifestsCount": len(manifests),
			"passengersCount": len(passengers),
		},
		"events": event_list,
		"manifests": manifests,
		"passengers": passengers,
	}

	OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
	OUT_JSON.write_text(json.dumps(dataset, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
	print(f"written {OUT_JSON} ({len(event_list)} events, {len(manifests)} buses, {len(passengers)} passengers)")


if __name__ == "__main__":
	main()
