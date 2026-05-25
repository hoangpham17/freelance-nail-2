import { PATHS } from "@/routes/Routes";

export type ServiceNavItem = {
  path: string;
  label: string;
  slug: string;
};

export function buildServiceNavItems(
  categories: { slug: string; title: string }[],
): ServiceNavItem[] {
  return categories.map((category) => ({
    path: `${PATHS.services}#${category.slug}`,
    label: category.title,
    slug: category.slug,
  }));
}

export function getActiveServiceSlug(
  pathname: string,
  hash: string,
): string | null {
  if (pathname !== PATHS.services) return null;
  const slug = decodeURIComponent(hash.replace("#", ""));
  return slug || null;
}

export function isServiceCategoryActive(
  pathname: string,
  hash: string,
  slug: string,
): boolean {
  return getActiveServiceSlug(pathname, hash) === slug;
}
