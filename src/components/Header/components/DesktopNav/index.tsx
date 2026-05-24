import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex } from "antd";
import { PATHS } from "@/routes/Routes";
import {
  getDesktopNavLinkClassName,
  isNavItemActive,
} from "@/shared/utils/nav";
import { Wrapper } from "@/based/components/Wrapper";

const DESKTOP_NAV = [
  { path: PATHS.home, label: "Home" },
  { path: PATHS.services, label: "Our Services" },
  { path: PATHS.hostAParty, label: "Host a Party" },
  { path: PATHS.gallery, label: "Gallery" },
  { path: PATHS.aboutUs, label: "About Us" },
] as const;

const BOOKING_URL = "https://booking.spacepos.net/?id=jzOR8l!BpuM=";

interface DesktopNavProps {
  isServicesHovered: boolean;
  setIsServicesHovered: (value: boolean) => void;
  hoverTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
  isServicesPage: boolean;
  isHeaderTransparent?: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  setIsServicesHovered,
  hoverTimeoutRef,
  isServicesPage,
  isHeaderTransparent = false,
}) => {
  const location = useLocation();

  return (
    <div
      className={
        isHeaderTransparent
          ? "hidden lg:block w-full border-b border-primary bg-transparent transition-colors duration-300"
          : "hidden lg:block w-full border-b border-madison-border/40 bg-black/95 transition-colors duration-300"
      }
    >
      <Wrapper className="max-w-[1440px]">
        <Flex
          align="center"
          justify="space-between"
          className="h-[70px] gap-6 xl:gap-10"
        >
          <Link
            to={PATHS.home}
            className="flex h-full shrink-0 items-center self-stretch"
          >
            <img
              src="/assets/images/logo/desktop.png"
              alt="Madison Nail Lounge"
              className="h-[50px] w-auto max-h-[50px] object-contain"
            />
          </Link>

          <nav
            className="flex flex-1 items-center justify-center gap-6 xl:gap-10"
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
                    if (!isServices || isServicesPage) return;
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
                    className={getDesktopNavLinkClassName(isActive)}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          <Flex align="center" className="shrink-0">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="madison-btn-primary !rounded-[24px] !py-3 !px-6 !text-base"
            >
              Booking Now
            </a>
          </Flex>
        </Flex>
      </Wrapper>
    </div>
  );
};

export default DesktopNav;
