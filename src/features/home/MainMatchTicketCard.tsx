"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useMemo } from "react";

import matchCardStyles from "@/components/MatchCard/MatchCard.module.scss";
import type { Game } from "@/data/games";
import { getTeamLogoPath } from "@/data/teamLogos";
import {
  formatPriceForButton,
  MatchTicketProductsBlock,
} from "@/features/tickets";
import { useTicketLinks } from "@/lib/personalData";

import styles from "./MainMatchTicketCard.module.scss";

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function extractTime(value: string | undefined): string | null {
  if (!value) return null;
  return value.match(/(\d{1,2}:\d{2})$/)?.[1] ?? value.trim();
}

function parseSeasonTour(value: string | undefined): { tour: string } | null {
  const source = value?.trim();
  if (!source) return null;
  const m = source.match(/(\d+)\s*тур/i);
  if (!m) return null;
  return { tour: m[1]! };
}

function promoTypeLabel(value: Game["promoType"]): string {
  if (value === "cup") return "Кубок";
  if (value === "vk") return "Товарищеский";
  return "РПЛ";
}

function normalizeTournamentName(
  value: string | undefined,
  fallback: string,
): string {
  const source = value?.trim();
  if (!source) return fallback;
  return source.replace(
    /Альфа-Банк\s+РОССИЙСКАЯ\s+ПРЕМЬЕР-ЛИГА/gi,
    "Альфа-Банк РПЛ",
  );
}

function isRplMatch(game: Game): boolean {
  return game.promoType === "rpl";
}

function resolveStadium(game: Game): { label: string; name: string } {
  const stadium = game.stadium?.trim() || "Солидарность Самара Арена";
  return {
    label: "Стадион Чемпионата Мира:",
    name: stadium,
  };
}

export function MainMatchTicketCard({ game }: { game: Game }) {
  const { getTicketUrl, handleTicketClick } = useTicketLinks();
  const homeLogo = getTeamLogoPath(game.homeTeam);
  const awayLogo = getTeamLogoPath(game.awayTeam);

  const matchInfo = useMemo(() => {
    const parsed = parseSeasonTour(game.seasonTour);
    const tournamentName = normalizeTournamentName(
      game.leagueInfo,
      promoTypeLabel(game.promoType),
    );
    const topLine = parsed
      ? `${tournamentName} · ${parsed.tour} тур`
      : tournamentName;

    const weekday = game.dateIso
      ? new Intl.DateTimeFormat("ru-RU", { weekday: "short" })
          .format(new Date(`${game.dateIso}T12:00:00`))
          .replace(".", "")
      : null;
    const dayMonth = game.dateIso
      ? new Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "2-digit",
        }).format(new Date(`${game.dateIso}T12:00:00`))
      : game.dateCard || null;
    const time = extractTime(game.time);

    return {
      topLine,
      dateTime: [dayMonth, weekday, time ? `${time} (СМР)` : null]
        .filter(Boolean)
        .join(", "),
      stadium: resolveStadium(game),
      mainPrice: formatPriceForButton(game.ticketLinkPriceFrom, "от 290 ₽"),
    };
  }, [game]);

  const defaultTicketHref = game.ticketLink?.trim() || "#";

  const handlePartnerLink = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (handleTicketClick(href)) e.preventDefault();
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.kickerRow}>
          <p className={cx(styles.kicker, "font-mono")}>{matchInfo.topLine}</p>
          {isRplMatch(game) ? (
            <a className={cx(styles.fanIdButton, "font-mono")} href="#fan-card">
              FAN ID
            </a>
          ) : null}
        </div>
        <div className={styles.teamsBlock}>
          <div className={styles.teamRow}>
            {homeLogo ? (
              <Image
                src={homeLogo}
                alt={
                  game.homeTeam ? `Логотип ${game.homeTeam}` : "Логотип хозяев"
                }
                width={24}
                height={24}
                className={styles.teamLogo}
              />
            ) : null}
            <p className={styles.teamName}>{game.homeTeam}</p>
          </div>
          <div className={styles.teamRow}>
            {awayLogo ? (
              <Image
                src={awayLogo}
                alt={
                  game.awayTeam ? `Логотип ${game.awayTeam}` : "Логотип гостей"
                }
                width={24}
                height={24}
                className={styles.teamLogo}
              />
            ) : null}
            <p className={styles.teamName}>{game.awayTeam}</p>
          </div>
        </div>
        <p className={cx(styles.meta, "font-mono")}>{matchInfo.dateTime}</p>
        <p className={cx(styles.meta, styles.stadium, "font-mono")}>
          <span className={styles.stadiumLabel}>{matchInfo.stadium.label}</span>
          <span className={styles.stadiumName}>{matchInfo.stadium.name}</span>
        </p>
      </div>

      <a
        className={cx(
          matchCardStyles.btnPrimary,
          styles.mainAction,
          "font-mono",
        )}
        href={getTicketUrl(defaultTicketHref)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => handlePartnerLink(e, defaultTicketHref)}
      >
        Купить билет {matchInfo.mainPrice}
      </a>

      <MatchTicketProductsBlock game={game} layout="main" />
    </article>
  );
}
