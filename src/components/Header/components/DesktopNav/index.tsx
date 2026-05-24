import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, Image } from "antd";
import { PATHS } from "@/routes/Routes";
import clsx from "clsx";
import { Wrapper } from "@/based/components/Wrapper";

const DESKTOP_NAV = [
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
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  setIsServicesHovered,
  hoverTimeoutRef,
  isServicesPage,
}) => {
  const location = useLocation();

  return (
    <div className="hidden lg:block w-full bg-black/95 border-b border-madison-border/40">
      <Wrapper className="max-w-[1440px]">
        <Flex
          align="center"
          justify="space-between"
          className="h-[70px] gap-6 xl:gap-10"
        >
          <Link to={PATHS.home} className="shrink-0">
            <Image
              src="/assets/images/logo/desktop.png"
              alt="Madison Nail Lounge"
              className="max-h-[50px] !w-auto"
              preview={false}
            />
          </Link>

          <nav
            className="flex flex-1 items-center justify-center gap-6 xl:gap-10"
            aria-label="Main navigation"
          >
            {DESKTOP_NAV.map((item) => {
              const isActive = location.pathname === item.path;
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
                    className={clsx(
                      "font-montserrat text-base font-medium uppercase tracking-wide transition-colors whitespace-nowrap",
                      isActive
                        ? "text-madison-gold"
                        : "text-madison-muted hover:text-madison-text",
                    )}
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
