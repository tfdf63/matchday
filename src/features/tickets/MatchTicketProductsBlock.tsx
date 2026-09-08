"use client";

import Image from "next/image";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { LocationArrowIcon, PromoBadgeIcon } from "@/components/Button";
import { MenuParkingIcon, MenuTicketIcon } from "@/components/Menu";
import { BaseModal } from "@/components/Modal";
import matchCardStyles from "@/components/MatchCard/MatchCard.module.scss";
import type { Game } from "@/data/games";
import { PromoCodeCopy } from "@/features/home/home-modal/PromoCodeCopy";
import { useTicketLinks } from "@/lib/personalData";

import { getMatchTicketSections } from "./getMatchTicketSections";
import styles from "./MatchTicketProductsBlock.module.scss";
import {
  TICKET_SECTION_ORDER,
  type TicketDescriptionIcon,
  type TicketDescriptionItem,
  type TicketProduct,
} from "./types";

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

export type MatchTicketProductsBlockProps = {
  game: Game;
  className?: string;
  layout?: "main" | "calendar";
};

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

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

function isPremiumTicketModal(product: TicketProduct): boolean {
  return product.id === "business" || product.id === "lodges";
}

function ContactMailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3.5 5.5H16.5V14.5H3.5V5.5Z" stroke="currentColor" strokeWidth="1.2" />
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" aria-hidden>
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
      <rect x="3.5" y="5.5" width="13" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 8.5H16.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 3.5V6.5M13 3.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DescriptionSeasonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4.5 6.5H15.5V14.5H4.5V6.5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 9.5H13M7 12H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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
      <path d="M7 4.5V11.5C7 12.3 7.7 13 8.5 13H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7 4.5C7 6.5 5.5 7.5 5.5 9.5V11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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
      <path d="M4.5 8.5H15.5V15.5H4.5V8.5Z" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7.5 8.5V7.2C7.5 6.1 8.4 5.2 9.5 5.2H10.5C11.6 5.2 12.5 6.1 12.5 7.2V8.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M4.5 11.5H15.5" stroke="currentColor" strokeWidth="1.2" />
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
      <path d="M5 15.5H15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ProductIcon({ type }: { type: TicketDescriptionIcon }) {
  if (type === "ticket") return <MenuTicketIcon />;
  if (type === "location") return <LocationArrowIcon />;
  if (type === "promo") return <PromoBadgeIcon />;
  if (type === "match") return <DescriptionMatchIcon />;
  if (type === "season") return <DescriptionSeasonIcon />;
  if (type === "view") return <DescriptionViewIcon />;
  if (type === "food") return <DescriptionFoodIcon />;
  if (type === "manager") return <DescriptionManagerIcon />;
  if (type === "parking") return <MenuParkingIcon />;
  return <DescriptionCrownIcon />;
}

function renderModalDescriptionItem(
  item: TicketDescriptionItem,
  premium: boolean,
): ReactNode {
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
            <p className={cx(styles.modalListTitle, "font-mono")}>{item.title}</p>
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

export function MatchTicketProductsBlock({
  game,
  className,
  layout = "main",
}: MatchTicketProductsBlockProps) {
  const [activeProduct, setActiveProduct] = useState<TicketProduct | null>(null);
  const { getTicketUrl, handleTicketClick } = useTicketLinks();
  const sections = useMemo(() => getMatchTicketSections(game), [game]);

  useEffect(() => {
    setActiveProduct(null);
  }, [game.id]);

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
    <>
      <div
        className={cx(
          styles.root,
          layout === "calendar" && styles.layoutCalendar,
          className,
        )}
      >
        {TICKET_SECTION_ORDER.map((sectionId) => {
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
    </>
  );
}
