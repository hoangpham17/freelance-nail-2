export type ServicePriceTier = {
  label: string;
  cashPrice: string;
  cardPrice: string;
};

const splitPipeValues = (value: string): string[] =>
  value
    .split(/\s*\|\s*/)
    .map((part) => part.trim())
    .filter(Boolean);

export const stripPricePrefix = (value: string): string =>
  value.replace(/^\$+/, "").trim();

export const normalizeServicePrice = (value: unknown): string => {
  if (value == null || value === "") return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "object" && value !== null && "error" in value) return "";
  return String(value);
};

export const formatServicePrice = (value: unknown): string => {
  const price = normalizeServicePrice(value).trim();
  if (!price) return "";
  return price.startsWith("$") ? price : `$${price}`;
};

export const parseServiceTiers = (
  name: string,
  price: string,
  cardPrice: string,
): ServicePriceTier[] | null => {
  const labels = splitPipeValues(name || "");
  const cashPrices = splitPipeValues(price || "").map(stripPricePrefix);
  const cardPrices = splitPipeValues(cardPrice || "").map(stripPricePrefix);

  const hasMultipleValues =
    labels.length > 1 || cashPrices.length > 1 || cardPrices.length > 1;

  if (!hasMultipleValues) return null;

  const tierCount = Math.max(
    labels.length,
    cashPrices.length,
    cardPrices.length,
    1,
  );

  return Array.from({ length: tierCount }, (_, index) => ({
    label: labels[index] ?? labels[labels.length - 1] ?? "",
    cashPrice: cashPrices[index] ?? "",
    cardPrice: cardPrices[index] ?? "",
  }));
};
