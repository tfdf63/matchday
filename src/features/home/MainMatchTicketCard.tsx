"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useMemo, useState } from "react";

import { LocationArrowIcon, PromoBadgeIcon } from "@/components/Button";
import { MenuParkingIcon, MenuTicketIcon } from "@/components/Menu";
import { BaseModal } from "@/components/Modal";
import matchCardStyles from "@/components/MatchCard/MatchCard.module.scss";
import type { Game } from "@/data/games";
import { HOME_OFFERS_SOCIAL_TELEGRAM_HREF } from "@/data/homeInfoModals";
import { getSectorPageBySlug } from "@/data/sectorPages";
import { getTeamLogoPath } from "@/data/teamLogos";
import { PromoCodeCopy } from "@/features/home/home-modal/PromoCodeCopy";
import { useTicketLinks } from "@/lib/personalData";

import styles from "./MainMatchTicketCard.module.scss";

type TicketDescriptionIcon =
  | "ticket"
  | "location"
  | "promo"
  | "match"
  | "season"
  | "view"
  | "food"
  | "manager"
  | "parking"
  | "crown";

type TicketDescriptionItem = {
  icon: TicketDescriptionIcon;
  text?: string;
  title?: string;
  description?: string;
  imageAfter?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type TicketProduct = {
  id: string;
  title: string;
  price: string;
  href: string;
  actionLabel: string;
  subtitle: string;
  lead?: string;
  schemaSrc: string;
  schemaAlt: string;
  descriptions: TicketDescriptionItem[];
  promoCode?: string;
  promoDescription?: string;
  isNew?: boolean;
};

type TicketSection = {
  id: string;
  title: string;
  products: TicketProduct[];
};

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

function withSpacesInPrice(value: string | undefined): string | undefined {
  if (!value) return value;
  return value.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
}

function formatPriceForButton(value: string | undefined, fallback: string): string {
  return (withSpacesInPrice(value) || fallback).replace("₽", "Р");
}

const TICKET_MODAL_PRODUCT_IDS = new Set(["vip", "business", "lodges"]);

const PREMIUM_LOUNGE_CONTACTS = {
  email: "filatov.vo@fcakron.com",
  phone: "+7 (987) 932 73-20",
  phoneHref: "tel:+79879327320",
} as const;

const SOCIAL_TICKET_CONTACTS = {
  phone: "+7 9276 87-97-50",
  phoneHref: "tel:+79276879750",
  name: "Кузнецов Вячеслав",
} as const;

const STUDENT_TICKET_LINKS = [
  { label: "ВК", href: "https://vk.com/club237654596" },
  { label: "ТЕЛЕГРАМ", href: "https://t.me/studakron" },
] as const;

function isStudentTicketModal(product: TicketProduct): boolean {
  return product.id === "student";
}

function hasPremiumLoungeContacts(product: TicketProduct): boolean {
  return product.id === "business" || product.id === "lodges";
}

function hasSocialTicketContacts(product: TicketProduct): boolean {
  return (
    product.id === "social-base" ||
    product.id === "social-family" ||
    product.id === "social-mgn"
  );
}

function hasTicketModalFooter(product: TicketProduct): boolean {
  return (
    isStudentTicketModal(product) ||
    TICKET_MODAL_PRODUCT_IDS.has(product.id) ||
    product.actionLabel === "Купить билеты" ||
    product.actionLabel === "Оставить заявку"
  );
}

function formatModalActionLabel(product: TicketProduct): string {
  if (
    product.actionLabel === "Оставить заявку" ||
    product.price.toLowerCase().startsWith("по")
  ) {
    return product.actionLabel;
  }

  return `${product.actionLabel} ${product.price.replace("₽", "Р")}`;
}

function resolveStadium(game: Game): { label: string; name: string } {
  const stadium = game.stadium?.trim() || "Солидарность Самара Арена";
  return {
    label: "Стадион Чемпионата Мира:",
    name: stadium,
  };
}

const PREMIUM_SERVICE_BENEFITS: TicketDescriptionItem[] = [
  {
    icon: "ticket",
    text: "Места в центральных секторах «Солидарность Самара Арена»",
  },
  {
    icon: "promo",
    text: "Полноценное банкетное меню — еда и напитки включены",
  },
  {
    icon: "ticket",
    text: "Персональный менеджер на весь матч — всегда на связи",
  },
  {
    icon: "location",
    text: "Парковка на территории арены на любом авто",
  },
  {
    icon: "promo",
    text: "Располагающая обстановка для встреч, которые важно провести правильно",
  },
];

const PREMIUM_LODGE_BENEFITS: TicketDescriptionItem[] = [
  {
    icon: "view",
    text: "Места в центральных секторах «Солидарность Самара Арена»",
  },
  {
    icon: "food",
    text: "Полноценное банкетное меню — еда и напитки включены",
  },
  {
    icon: "manager",
    text: "Персональный менеджер на весь матч — всегда на связи",
  },
  {
    icon: "parking",
    text: "Парковка на территории арены на любом авто",
  },
  {
    icon: "crown",
    text: "Располагающая обстановка для встреч, которые важно провести правильно",
  },
];

const STUDENT_BLOCK_ICONS: TicketDescriptionIcon[] = [
  "ticket",
  "promo",
  "ticket",
  "location",
  "promo",
  "location",
];

function getStudentSectorModalContent(): Pick<
  TicketProduct,
  "subtitle" | "lead" | "schemaSrc" | "schemaAlt" | "descriptions" | "href"
> {
  const sector = getSectorPageBySlug("stud");
  const telegramHref =
    sector?.communityCta.buttons?.find((button) => button.label === "Телеграм")
      ?.href ?? HOME_OFFERS_SOCIAL_TELEGRAM_HREF;

  if (!sector) {
    return {
      subtitle: "Сектор D116",
      lead: "Сектор молодых и звонких фанатов. Это пространство для студентов, которых объединяет игра, эмоции и желание быть частью чего-то большего.",
      schemaSrc: "/images/schema/schema-stud.png",
      schemaAlt: "Схема секторов для студенческого тарифа",
      href: telegramHref,
      descriptions: [],
    };
  }

  return {
    subtitle: `Сектор ${sector.introHeading}`,
    lead: sector.introSubtitle,
    schemaSrc: "/images/schema/schema-stud.png",
    schemaAlt: "Схема сектора D116 для студенческого тарифа",
    href: telegramHref,
    descriptions: sector.blocks.map((block, index) => ({
      icon: STUDENT_BLOCK_ICONS[index] ?? "ticket",
      title: block.title,
      description: block.text,
      ...(block.title === "Бесплатные билеты для студентов"
        ? {
            imageAfter: {
              src: sector.hero.src,
              alt: sector.hero.alt,
              width: sector.hero.width,
              height: sector.hero.height,
            },
          }
        : {}),
    })),
  };
}

function getMainTicketSections(game: Game): TicketSection[] {
  const ticket = game.ticketLink?.trim() || "#";
  const vip = game.ticketLinkVip?.trim() || ticket;
  const lodges = game.ticketLinkSkybox?.trim() || ticket;
  const business = game.ticketLinkBusinessClub?.trim() || lodges;
  const family = game.ticketLinkC4?.trim() || ticket;
  const fan = game.ticketLinkFanNew?.trim() || ticket;
  const social = HOME_OFFERS_SOCIAL_TELEGRAM_HREF;
  const studentSector = getStudentSectorModalContent();

  return [
    {
      id: "special",
      title: "Специальные",
      products: [
        {
          id: "family",
          title: "Семейный",
          price: "от 590 ₽",
          href: family,
          actionLabel: "Купить билеты",
          subtitle: "Секторы C413-C417 · 4 этаж",
          schemaSrc: "/images/schema/shema-c415.png",
          schemaAlt: "Схема семейного сектора C413-C417",
          descriptions: [
            {
              icon: "ticket",
              text: "Тёплая зона, мягкие сидушки, отличный вид на поле",
            },
            {
              icon: "location",
              text: "Детская зона и активные игры: текбол, творческие зоны",
            },
            { icon: "promo", text: "Аквагрим и DJ-сеты перед матчем" },
          ],
          promoCode: "AKRKIDS",
          promoDescription: "От 2 билетов, включая 1 детский — ещё −25%",
        },
        {
          id: "fan",
          title: "Фанатский",
          price: withSpacesInPrice(game.ticketLinkFanNewPriceFrom) || "от 390 ₽",
          href: fan,
          actionLabel: "Купить билеты",
          subtitle: "Трибуна D · сектор активной поддержки",
          schemaSrc: "/images/schema/schema-fan.png",
          schemaAlt: "Схема фанатского сектора",
          descriptions: [
            { icon: "ticket", text: "Самые преданные болельщики команды" },
            {
              icon: "location",
              text: "Приходим за 15 минут до начала и поддерживаем команду",
            },
            { icon: "promo", text: "Ранняя регистрация на гостевые выезды" },
          ],
        },
        {
          id: "student",
          title: "Студенческий",
          price: "По заявке",
          href: studentSector.href,
          actionLabel: "Оставить заявку",
          subtitle: studentSector.subtitle,
          lead: studentSector.lead,
          schemaSrc: studentSector.schemaSrc,
          schemaAlt: studentSector.schemaAlt,
          descriptions: studentSector.descriptions,
        },
      ],
    },
    {
      id: "social",
      title: "Социальные",
      products: [
        {
          id: "social-base",
          title: "Социальный",
          price: "По заявке",
          href: social,
          actionLabel: "Оставить заявку",
          subtitle: "Бесплатные билеты в сектор C124",
          lead: "Пенсионеры, участники ВОВ и боевых действий могут получить билет в кассе в день матча при подтверждении статуса.",
          schemaSrc: "/images/sector/3-1920.png",
          schemaAlt: "Болельщики ФК Акрон на трибуне",
          descriptions: [
            {
              icon: "promo",
              text: "Для подачи заявки не позднее чем за 3 дня до матча отправьте сообщение в Telegram: t.me/slava_tfdf — «Заявка на билеты для пенсионера/ветерана на матч [указать матч]».",
            },
          ],
        },
        {
          id: "social-family",
          title: "Многодетным",
          price: "По заявке",
          href: social,
          actionLabel: "Оставить заявку",
          subtitle: "Секторы C413-C417 · 4 этаж",
          lead: "Многодетные семьи могут получить скидку 75% на покупку билетов в семейный сектор C4.",
          schemaSrc: "/images/sector/c4-1.webp",
          schemaAlt: "Семья болельщиков ФК Акрон на трибуне",
          descriptions: [
            {
              icon: "promo",
              text: "Для подачи заявки не позднее чем за 3 дня до матча отправьте сообщение в Telegram: t.me/slava_tfdf — «Заявка на билеты для многодетных семей на матч [указать матч]».",
            },
          ],
        },
        {
          id: "social-mgn",
          title: "МГН",
          price: "По заявке",
          href: social,
          actionLabel: "Оставить заявку",
          subtitle: "Маломобильные группы населения",
          schemaSrc: "/images/sector/mgn.webp",
          schemaAlt: "Места для маломобильных групп населения на стадионе",
          descriptions: [
            { icon: "ticket", text: "Подбор мест с удобным доступом" },
            {
              icon: "location",
              text: "Сопровождение по организационным вопросам",
            },
            { icon: "promo", text: "Индивидуальная обработка заявки" },
          ],
        },
      ],
    },
    {
      id: "premium",
      title: "Премиум",
      products: [
        {
          id: "vip",
          title: "VIP",
          price: withSpacesInPrice(game.ticketLinkVipPriceFrom) || "от 1 490 ₽",
          href: vip,
          actionLabel: "Купить билеты",
          subtitle: "Премиальные места и сервис",
          schemaSrc: "/images/schema/shema-vip.png",
          schemaAlt: "Схема VIP-секторов",
          descriptions: [
            {
              icon: "view",
              title: "Эксклюзивная близость",
              description:
                "Слышите указания тренера, видите реакции игроков и всё, что скрыто от обычных зрителей.",
            },
            {
              icon: "match",
              title: "Главные эмоции",
              description:
                "Именно здесь разворачиваются горячие споры с арбитром, триумфальные выходы замен и нерв скамейки в решающие минуты.",
            },
            {
              icon: "view",
              title: "Идеальный ракурс",
              description:
                "Отличный обзор атакующих действий и оборонительных построений вашей команды.",
            },
            {
              icon: "ticket",
              title: "Премиальная атмосфера",
              description: "Комфортные мягкие кресла.",
            },
            {
              icon: "promo",
              text: "Это не просто билет на матч — это пропуск за кулисы большого футбола.",
            },
          ],
        },
        {
          id: "business",
          title: "Бизнес-клуб",
          price:
            withSpacesInPrice(game.ticketLinkBusinessClubPriceFrom) ||
            "от 6 990 ₽",
          href: business,
          actionLabel: "Купить билеты",
          subtitle: "S344 · 15 мест",
          lead: "Дешевле, чем приватная ложа целиком, но с полноценным премиальным сервисом и своими преимуществами.",
          schemaSrc: "/images/sector/skybox.webp",
          schemaAlt: "VIP-ложа на стадионе",
          descriptions: PREMIUM_SERVICE_BENEFITS,
          isNew: true,
        },
        {
          id: "lodges",
          title: "Ложи",
          price:
            withSpacesInPrice(game.ticketLinkSkyboxPriceFrom) || "от 11 500 ₽",
          href: lodges,
          actionLabel: "Купить билеты",
          subtitle: "VIP-ложа · 10/15/24 чел.",
          schemaSrc: "/images/sector/skybox.webp",
          schemaAlt: "VIP-ложа на стадионе",
          descriptions: [
            {
              icon: "match",
              title: "Разовое посещение матча",
              description:
                "VIP-ложа. Подходит для корпоратива, встречи с партнёрами или просто большой компании. Питание и напитки согласовываете заранее с менеджером под свой запрос.",
            },
            {
              icon: "season",
              title: "Абонемент на сезон",
              description:
                "Матчи в подарок. Ваша ложа закреплена за вами на весь сезон — каждый домашний матч, именные места. Формат с питанием и без.",
            },
            ...PREMIUM_LODGE_BENEFITS,
          ],
        },
      ],
    },
  ];
}

function ContactMailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.5 5.5H16.5V14.5H3.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M3.5 6.5L10 11.5L16.5 6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactPhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M6.2 4.5H8.4L9.3 8.1L7.8 8.9C8.6 10.8 10.2 12.4 12.1 13.2L12.9 11.7L16.5 12.6V14.8C16.5 15.2 16.2 15.5 15.8 15.5C9.4 15.1 4.9 10.6 4.5 4.2C4.5 3.8 4.8 3.5 5.2 3.5H6.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DescriptionMatchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5.5"
        width="13"
        height="11"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M3.5 8.5H16.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7 3.5V6.5M13 3.5V6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DescriptionSeasonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.5 6.5H15.5V14.5H4.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M7 9.5H13M7 12H11"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12.5 3.5L14.5 5.5L12.5 7.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DescriptionViewIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3.5 10C5.5 6.5 8.5 5 10 5C11.5 5 14.5 6.5 16.5 10C14.5 13.5 11.5 15 10 15C8.5 15 5.5 13.5 3.5 10Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function DescriptionFoodIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7 4.5V11.5C7 12.3 7.7 13 8.5 13H9.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M7 4.5C7 6.5 5.5 7.5 5.5 9.5V11.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12.5 4.5V9.5C12.5 10.6 13.4 11.5 14.5 11.5V15.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DescriptionManagerIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.5 8.5H15.5V15.5H4.5V8.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M7.5 8.5V7.2C7.5 6.1 8.4 5.2 9.5 5.2H10.5C11.6 5.2 12.5 6.1 12.5 7.2V8.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4.5 11.5H15.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function DescriptionCrownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 13.5L5.8 7.5L10 10.5L14.2 7.5L16 13.5H4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M5 15.5H15"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProductIcon({ type }: { type: TicketDescriptionIcon }) {
  if (type === "ticket") {
    return <MenuTicketIcon />;
  }
  if (type === "location") {
    return <LocationArrowIcon />;
  }
  if (type === "promo") {
    return <PromoBadgeIcon />;
  }
  if (type === "match") {
    return <DescriptionMatchIcon />;
  }
  if (type === "season") {
    return <DescriptionSeasonIcon />;
  }
  if (type === "view") {
    return <DescriptionViewIcon />;
  }
  if (type === "food") {
    return <DescriptionFoodIcon />;
  }
  if (type === "manager") {
    return <DescriptionManagerIcon />;
  }
  if (type === "parking") {
    return <MenuParkingIcon />;
  }
  return <DescriptionCrownIcon />;
}

function isPremiumTicketModal(product: TicketProduct): boolean {
  return product.id === "business" || product.id === "lodges";
}

function renderModalDescriptionItem(
  item: TicketDescriptionItem,
  premium: boolean,
) {
  const iconClassName = cx(
    styles.modalListIcon,
    premium ? styles.modalListIconPremium : styles.modalListIconLarge,
  );

  return (
    <>
      <span className={iconClassName} aria-hidden>
        <ProductIcon type={item.icon} />
      </span>
      <div className={styles.modalListContent}>
        {item.title ? (
          <>
            <p className={cx(styles.modalListTitle, "font-mono")}>
              {item.title}
            </p>
            {item.description ? (
              <p className={cx(styles.modalListDescription, "font-mono")}>
                {item.description}
              </p>
            ) : null}
          </>
        ) : (
          <span className="font-mono">{item.text}</span>
        )}
      </div>
    </>
  );
}

export function MainMatchTicketCard({ game }: { game: Game }) {
  const [activeProduct, setActiveProduct] = useState<TicketProduct | null>(
    null,
  );
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

  const sections = useMemo(() => getMainTicketSections(game), [game]);
  const defaultTicketHref = game.ticketLink?.trim() || "#";

  const handlePartnerLink = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (handleTicketClick(href)) e.preventDefault();
  };

  const resolveProductHref = (product: TicketProduct): string =>
    product.actionLabel === "Оставить заявку"
      ? product.href
      : getTicketUrl(product.href);

  const renderModalFooterAction = (product: TicketProduct) => (
    <a
      className={cx(matchCardStyles.btnPrimary, styles.modalAction, "font-mono")}
      href={resolveProductHref(product)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (product.actionLabel === "Оставить заявку") return;
        handlePartnerLink(e, product.href);
      }}
    >
      {formatModalActionLabel(product)}
    </a>
  );

  const renderStudentModalFooter = () => (
    <div className={styles.modalStudentFooter}>
      <p className={cx(styles.modalStudentFooterTitle, "font-mono")}>
        Получить билет
      </p>
      <div className={styles.modalStudentFooterButtons}>
        {STUDENT_TICKET_LINKS.map((link) => (
          <a
            key={link.href}
            className={cx(
              matchCardStyles.btnPrimary,
              styles.modalStudentFooterButton,
              "font-mono",
            )}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );

  const renderModalFooter = (product: TicketProduct) =>
    isStudentTicketModal(product)
      ? renderStudentModalFooter()
      : renderModalFooterAction(product);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <p className={cx(styles.kicker, "font-mono")}>{matchInfo.topLine}</p>
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

      <div className={styles.sections}>
        {(["premium", "special", "social"] as const).map((sectionId) => {
          const section = sections.find((item) => item.id === sectionId);
          if (!section) return null;
          return (
            <section key={section.id} className={styles.sectionBlock}>
              <p className={cx(styles.sectionTitle, "font-mono")}>
                {section.title}
              </p>
              <div className={styles.productsGrid}>
                {section.products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className={cx(
                      matchCardStyles.btnOutline,
                      styles.productButton,
                      "font-mono",
                    )}
                    onClick={() => setActiveProduct(product)}
                  >
                    {product.isNew ? (
                      <span className={styles.newBadge}>Новое</span>
                    ) : null}
                    <span className={styles.productTitle}>{product.title}</span>
                    <span className={styles.productPrice}>{product.price}</span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <BaseModal
        open={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
        title={activeProduct?.title}
        panelClassName={styles.modalPanel}
        bodyClassName={styles.modalBody}
        footer={
          activeProduct && hasTicketModalFooter(activeProduct)
            ? renderModalFooter(activeProduct)
            : null
        }
        footerClassName={cx(
          styles.modalFooter,
          activeProduct &&
            isStudentTicketModal(activeProduct) &&
            styles.modalFooterStudent,
        )}
      >
        {activeProduct ? (
          <div className={styles.modalContent}>
            <p className={cx(styles.modalSubtitle, "font-mono")}>
              {activeProduct.subtitle}
            </p>

            {activeProduct.lead ? (
              <p className={cx(styles.modalLead, "font-mono")}>
                {activeProduct.lead}
              </p>
            ) : null}

            <figure className={styles.modalSchemaFigure}>
              <Image
                src={activeProduct.schemaSrc}
                alt={activeProduct.schemaAlt}
                width={
                  activeProduct.id === "lodges" ||
                  activeProduct.id === "business"
                    ? 1200
                    : 687
                }
                height={
                  activeProduct.id === "lodges" ||
                  activeProduct.id === "business"
                    ? 800
                    : 688
                }
                className={styles.modalSchemaImage}
              />
            </figure>

            <ul
              className={cx(
                styles.modalList,
                isPremiumTicketModal(activeProduct) && styles.modalListPremium,
              )}
            >
              {activeProduct.descriptions.map((item, index) => (
                <li
                  key={`${activeProduct.id}-${item.title ?? item.text ?? index}`}
                  className={cx(
                    styles.modalListItem,
                    item.title && styles.modalListItemStructured,
                    item.imageAfter && styles.modalListItemStacked,
                  )}
                >
                  {item.imageAfter ? (
                    <div
                      className={cx(
                        styles.modalListItemRow,
                        item.title && styles.modalListItemStructured,
                      )}
                    >
                      {renderModalDescriptionItem(
                        item,
                        isPremiumTicketModal(activeProduct),
                      )}
                    </div>
                  ) : (
                    renderModalDescriptionItem(
                      item,
                      isPremiumTicketModal(activeProduct),
                    )
                  )}
                  {item.imageAfter ? (
                    <figure className={styles.modalSchemaFigure}>
                      <Image
                        src={item.imageAfter.src}
                        alt={item.imageAfter.alt}
                        width={item.imageAfter.width}
                        height={item.imageAfter.height}
                        className={styles.modalSchemaImage}
                      />
                    </figure>
                  ) : null}
                </li>
              ))}
            </ul>

            {hasPremiumLoungeContacts(activeProduct) ? (
              <div className={styles.modalContacts}>
                <p className={cx(styles.modalContactsLabel, "font-mono")}>
                  Контакты для связи:
                </p>
                <a
                  className={cx(styles.modalContactsRow, "font-mono")}
                  href={`mailto:${PREMIUM_LOUNGE_CONTACTS.email}`}
                >
                  <span className={styles.modalContactsIcon} aria-hidden>
                    <ContactMailIcon />
                  </span>
                  <span>{PREMIUM_LOUNGE_CONTACTS.email}</span>
                </a>
                <a
                  className={cx(styles.modalContactsRow, "font-mono")}
                  href={PREMIUM_LOUNGE_CONTACTS.phoneHref}
                >
                  <span className={styles.modalContactsIcon} aria-hidden>
                    <ContactPhoneIcon />
                  </span>
                  <span>{PREMIUM_LOUNGE_CONTACTS.phone}</span>
                </a>
              </div>
            ) : null}

            {hasSocialTicketContacts(activeProduct) ? (
              <div className={cx(styles.modalContacts, styles.modalContactsSocial)}>
                <p className={cx(styles.modalContactsLabel, "font-mono")}>
                  Контакты:
                </p>
                <a
                  className={cx(styles.modalContactsRow, "font-mono")}
                  href={SOCIAL_TICKET_CONTACTS.phoneHref}
                >
                  <span className={styles.modalContactsIcon} aria-hidden>
                    <ContactPhoneIcon />
                  </span>
                  <span>{SOCIAL_TICKET_CONTACTS.phone}</span>
                </a>
                <p className={cx(styles.modalContactsName, "font-mono")}>
                  {SOCIAL_TICKET_CONTACTS.name}
                </p>
              </div>
            ) : null}

            {activeProduct.promoCode && activeProduct.promoDescription ? (
              <div className={styles.modalPromo}>
                <p className={styles.modalPromoLabel}>Промокод</p>
                <p className={cx(styles.modalPromoLine, "font-mono")}>
                  <PromoCodeCopy
                    code={activeProduct.promoCode}
                    className={styles.modalCodeButton}
                  />
                  {" — "}
                  {activeProduct.promoDescription}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </BaseModal>
    </article>
  );
}
