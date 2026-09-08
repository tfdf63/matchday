export type TicketDescriptionIcon =
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

export type TicketDescriptionItem = {
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

export type TicketProduct = {
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

export type TicketSection = {
  id: string;
  title: string;
  products: TicketProduct[];
};

export type TicketSectionId = "premium" | "special" | "social";

export const TICKET_SECTION_ORDER: TicketSectionId[] = [
  "premium",
  "special",
  "social",
];
