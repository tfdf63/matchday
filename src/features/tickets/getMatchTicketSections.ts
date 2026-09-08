import type { Game } from "@/data/games";
import { HOME_OFFERS_SOCIAL_TELEGRAM_HREF } from "@/data/homeInfoModals";
import { getSectorPageBySlug } from "@/data/sectorPages";

import type {
  TicketDescriptionIcon,
  TicketDescriptionItem,
  TicketProduct,
  TicketSection,
} from "./types";

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

function withSpacesInPrice(value: string | undefined): string | undefined {
  if (!value) return value;
  return value.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
}

function getStudentSectorModalContent(): Pick<
  TicketProduct,
  "subtitle" | "lead" | "schemaSrc" | "schemaAlt" | "descriptions" | "href"
> {
  const sector = getSectorPageBySlug("stud");
  const telegramHref =
    sector?.communityCta?.buttons?.find((button) => button.label === "Телеграм")
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

export function getMatchTicketSections(game: Game): TicketSection[] {
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
          price: withSpacesInPrice(game.ticketLinkC4PriceFrom) || "от 590 ₽",
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
