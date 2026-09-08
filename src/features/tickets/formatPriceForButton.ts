function withSpacesInPrice(value: string | undefined): string | undefined {
  if (!value) return value;
  return value.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
}

export function formatPriceForButton(
  value: string | undefined,
  fallback: string,
): string {
  return (withSpacesInPrice(value) || fallback).replace("₽", "Р");
}
