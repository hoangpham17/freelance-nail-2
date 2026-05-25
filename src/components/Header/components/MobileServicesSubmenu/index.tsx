import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import type { ServiceNavItem } from "../../utils/serviceNav";

interface MobileServicesSubmenuProps {
  items: ServiceNavItem[];
  isExpanded: boolean;
  isSubActive: (slug: string) => boolean;
  onNavigate: () => void;
}

const MobileServicesSubmenu: React.FC<MobileServicesSubmenuProps> = ({
  items,
  isExpanded,
  isSubActive,
  onNavigate,
}) => {
  if (!isExpanded || items.length === 0) return null;

  return (
    <div className="border-t border-madison-border/40 bg-madison-black-soft">
      <ul className="m-0 list-none grid grid-cols-1 md:grid-cols-2 gap-1.5 p-3 md:p-4">
        {items.map((subItem) => {
          const active = isSubActive(subItem.slug);
          return (
            <li key={subItem.path}>
              <Link
                to={subItem.path}
                onClick={onNavigate}
                className={clsx(
                  "flex items-center justify-between gap-2 rounded-xl border px-4 py-2.5 capitalize font-montserrat transition-colors",
                  responsiveFontSizeArray(14, 16),
                  active
                    ? "border-madison-gold/70 bg-madison-surface !text-madison-gold font-semibold"
                    : "border-madison-border/50 text-madison-muted hover:border-madison-gold/40 hover:text-madison-gold",
                )}
              >
                <span className="truncate">{subItem.label}</span>
                {active ? (
                  <SvgIcon
                    src="/assets/svgs/star.svg"
                    ariaLabel="Active"
                    width={14}
                    height={14}
                    className="shrink-0 text-madison-gold"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileServicesSubmenu;
