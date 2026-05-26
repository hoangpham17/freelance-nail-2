import clsx from "clsx";
import { PATHS } from "@/routes/Routes";

/** Whether a main nav item matches the current route (Home is exact-only). */
export function isNavItemActive(pathname: string, itemPath: string): boolean {
  const path =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (itemPath === PATHS.home) {
    return path === PATHS.home;
  }

  return path === itemPath || path.startsWith(`${itemPath}/`);
}

/** Desktop / inline header nav link */
export function getDesktopNavLinkClassName(isActive: boolean): string {
  return clsx(
    "font-montserrat text-base 2xl:text-xl font-medium uppercase tracking-wide 2xl:tracking-wider transition-colors whitespace-nowrap",
    isActive
      ? "!text-madison-gold"
      : "text-madison-muted hover:!text-madison-gold",
  );
}

/** Mobile drawer nav link */
export function getMobileNavLinkClassName(isActive: boolean): string {
  return clsx(
    "flex items-center justify-between py-3 uppercase transition-colors px-5 font-montserrat hover:!text-madison-gold",
    isActive
      ? "bg-madison-surface !text-madison-gold font-semibold"
      : "text-madison-muted font-medium",
  );
}
