#!/usr/bin/env python3
"""Собирает JSON календаря сезона Акрона из CSV РПЛ."""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_CSV = ROOT / "src" / "data" / "standings" / "raw" / "matches_2026_27.csv"
DEFAULT_OVERRIDES = ROOT / "src" / "data" / "standings" / "whenOverrides.json"
DEFAULT_OUT = ROOT / "src" / "data" / "standings" / "season2627.json"

AKRON = "Акрон"

DOW = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
MONTHS = {
	1: "янв",
	2: "фев",
	3: "мар",
	4: "апр",
	5: "май",
	6: "июн",
	7: "июл",
	8: "авг",
	9: "сен",
	10: "окт",
	11: "ноя",
	12: "дек",
}

# Имена команд как в matchday (src/data/teamLogos.ts)
RPL_TO_MATCHDAY = {
	"Динамо М": "Динамо Мск",
	"Динамо Мх": "Динамо Мх",
	"Спартак М": "Спартак",
	"Локомотив М": "Локомотив",
	"Пари Нижний Новгород": "Пари НН",
}


def map_team(name: str) -> str:
	return RPL_TO_MATCHDAY.get(name, name)


def akron_pts(hg: int, ag: int, akron_home: bool) -> int:
	gf, ga = (hg, ag) if akron_home else (ag, hg)
	if gf > ga:
		return 3
	if gf < ga:
		return 0
	return 1


def akron_score(hg: int, ag: int, akron_home: bool) -> str:
	if akron_home:
		return f"{hg}:{ag}"
	return f"{ag}:{hg}"


def msk_to_samt(date: dt.date, time_msk: str) -> tuple[dt.date, str]:
	"""MSK → SAMT (+1 ч); при переходе через полночь сдвигается дата."""
	hour, minute = map(int, time_msk.split(":"))
	combined = dt.datetime.combine(date, dt.time(hour, minute)) + dt.timedelta(
		hours=1
	)
	return combined.date(), combined.strftime("%H:%M")


def format_when_exact(date: dt.date, time_samt: str) -> dict:
	label = f"{date.day} {MONTHS[date.month]} ({DOW[date.weekday()]})"
	return {
		"label": label,
		"time": time_samt,
		"exact": True,
		"text": f"{label}, {time_samt}",
		"range": False,
	}


def load_when_overrides(path: Path) -> dict[int, dict]:
	if not path.exists():
		return {}
	raw = json.loads(path.read_text(encoding="utf-8"))
	return {int(k): v for k, v in raw.items()}


def build_matches(
	season: str,
	csv_path: Path,
	when_overrides_path: Path,
) -> list[dict]:
	when_overrides = load_when_overrides(when_overrides_path)
	rows: list[dict] = []

	with csv_path.open(encoding="utf-8") as f:
		for r in csv.DictReader(f):
			if r["season"] != season:
				continue
			home, away = r["home"], r["away"]
			if home != AKRON and away != AKRON:
				continue

			tour = int(r["tour"])
			date = dt.date.fromisoformat(r["date"])
			time_msk = r.get("time_msk") or None
			if time_msk and r.get("time_exact") == "1":
				date, time_samt = msk_to_samt(date, time_msk)
			else:
				time_samt = time_msk
			akron_home = home == AKRON
			opponent = map_team(away if akron_home else home)
			venue = "home" if akron_home else "away"
			played = r["status"] == "played"

			if played:
				hg, ag = int(r["hg"]), int(r["ag"])
				match = {
					"score": akron_score(hg, ag, akron_home),
					"pts": akron_pts(hg, ag, akron_home),
					"played": True,
				}
			else:
				match = {"score": None, "pts": None, "played": False}

			when = when_overrides.get(tour)
			if when is None and time_samt and r.get("time_exact") == "1":
				when = format_when_exact(date, time_samt)
			elif when is None:
				label = f"{date.day} {MONTHS[date.month]} ({DOW[date.weekday()]})"
				when = {
					"label": label,
					"time": time_samt,
					"exact": bool(time_samt),
					"text": label if not time_samt else f"{label}, {time_samt}",
					"range": False,
				}

			rows.append(
				{
					"tour": tour,
					"date": date.isoformat(),
					"team": opponent,
					"venue": venue,
					"match": match,
					"when": when,
				}
			)

	rows.sort(key=lambda x: x["tour"])
	return rows


def main() -> None:
	parser = argparse.ArgumentParser(description="Import Akron standings season")
	parser.add_argument("--season", default="2026/27")
	parser.add_argument("--season-label", default="26/27")
	parser.add_argument("--csv", type=Path, default=DEFAULT_CSV)
	parser.add_argument("--overrides", type=Path, default=DEFAULT_OVERRIDES)
	parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
	args = parser.parse_args()

	if not args.csv.exists():
		raise SystemExit(f"CSV not found: {args.csv}")

	matches = build_matches(args.season, args.csv, args.overrides)
	if len(matches) != 30:
		raise SystemExit(f"Expected 30 Akron matches, got {len(matches)}")

	payload = {
		"season": args.season,
		"seasonLabel": args.season_label,
		"timezone": "SAMT",
		"matches": matches,
	}

	args.out.write_text(
		json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
		encoding="utf-8",
	)
	print(f"Wrote {args.out} ({len(matches)} matches)")


if __name__ == "__main__":
	main()
