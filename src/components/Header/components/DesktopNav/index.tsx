import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex } from "antd";
import clsx from "clsx";
import { PATHS } from "@/routes/Routes";
import {
  getDesktopNavLinkClassName,
  isNavItemActive,
} from "@/shared/utils/nav";
import { Wrapper } from "@/based/components/Wrapper";
import SvgIcon from "@/based/SvgIcon";
import { ListSocial } from "../ListSocial";

const DESKTOP_NAV = [
  { path: PATHS.home, label: "Home" },
  { path: PATHS.services, label: "Services" },
  { path: PATHS.hostAParty, label: "Host a Party" },
  { path: PATHS.gallery, label: "Gallery" },
  { path: PATHS.aboutUs, label: "About Us" },
] as const;

interface DesktopNavProps {
  isServicesHovered: boolean;
  setIsServicesHovered: (value: boolean) => void;
  hoverTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
  isHeaderTransparent?: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  isServicesHovered,
  setIsServicesHovered,
  hoverTimeoutRef,
  isHeaderTransparent = false,
}) => {
  const location = useLocation();

  return (
    <div
      className={
        isHeaderTransparent
          ? "hidden lg:block w-full border-b border-primary bg-transparent transition-colors duration-300"
          : "hidden lg:block w-full border-b border-primary bg-black/95 transition-colors duration-300"
      }
    >
      <Wrapper className="max-w-[1440px] 2xl:max-w-[1680px]">
        <Flex
          align="center"
          justify="space-between"
          className="h-[70px] xl:h-[88px] gap-6 xl:gap-10 2xl:gap-14"
        >
          <Link
            to={PATHS.home}
            className="flex h-full shrink-0 items-center self-stretch"
          >
            <img
              src="/assets/images/logo/desktop.png"
              alt="Madison Nail Lounge"
              className="h-[50px] w-auto max-h-[50px] xl:h-[64px] xl:max-h-[64px] object-contain"
            />
          </Link>

          <nav
            className="flex flex-1 items-center justify-center gap-6 xl:gap-10 xl:gap-14"
            aria-label="Main navigation"
          >
            {DESKTOP_NAV.map((item) => {
              const isActive = isNavItemActive(location.pathname, item.path);
              const isServices = item.path === PATHS.services;

              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => {
                    if (!isServices) return;
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                      hoverTimeoutRef.current = null;
                    }
                    setIsServicesHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (!isServices) return;
                    hoverTimeoutRef.current = setTimeout(() => {
                      setIsServicesHovered(false);
                    }, 150);
                  }}
                >
                  <Link
                    to={item.path}
                    aria-current={isActive ? "page" : undefined}
                    aria-haspopup={isServices ? "true" : undefined}
                    aria-expanded={isServices ? isServicesHovered : undefined}
                    className={getDesktopNavLinkClassName(isActive)}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {item.label}
                      {isServices ? (
                        <span aria-hidden="true" className="inline-flex">
                          <SvgIcon
                            src="/assets/svgs/chevron-right.svg"
                            ariaLabel="Submenu"
                            width={12}
                            height={12}
                            className={clsx(
                              "size-[10px] xl:size-3 shrink-0 rotate-90 transition-transform duration-200 text-current",
                              isServicesHovered && "rotate-[270deg]",
                            )}
                          />
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>

          <Flex align="center" className="shrink-0">
            <ListSocial />
          </Flex>
        </Flex>
      </Wrapper>
    </div>
  );
};

export default DesktopNav;
