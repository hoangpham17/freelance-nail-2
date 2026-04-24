import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, Image } from "antd";
import { PATHS } from "@/routes/Routes";
import { ListSocial } from "../ListSocial";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { NoiseBackground } from "@/components/NoiseBackground";
import SvgIcon from "@/based/SvgIcon";

interface NavItem {
  path: string;
  label: string;
  hasDropdown?: boolean;
}

const LEFT_NAV: NavItem[] = [
  { path: PATHS.home, label: "Home" },
  { path: PATHS.services, label: "Services", hasDropdown: true },
  { path: PATHS.hostAParty, label: "Host a party" },
];

const RIGHT_NAV: NavItem[] = [
  { path: PATHS.gallery, label: "Gallery" },
  { path: PATHS.aboutUs, label: "About us" },
  { path: PATHS.ourPolicies, label: "Our Policies" },
];

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

  const renderNavItem = (item: NavItem) => {
    const isActive = location.pathname === item.path;
    const isServices = item.label === "Services";

    return (
      <div
        key={item.path}
        className="relative group h-full flex items-center"
        onMouseEnter={() => {
          if (isServices) {
            if (isServicesPage) return;
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
              hoverTimeoutRef.current = null;
            }
            setIsServicesHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (isServices) {
            hoverTimeoutRef.current = setTimeout(() => {
              setIsServicesHovered(false);
            }, 150);
          }
        }}
      >
        {/* Selected State Background */}
        <div
          className={clsx(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] pointer-events-none flex items-center justify-center z-0 transition-opacity duration-300",
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          <img
            src="/assets/images/Header/header-selected.png"
            alt="selected"
            className="w-full h-full object-fill"
          />
        </div>

        <Link
          to={item.path}
          className={clsx(
            "relative z-10 transition-colors duration-300 whitespace-nowrap px-4 py-2 flex items-center gap-1.5",
            responsiveFontSizeArray(16, 20, { lg: 16, xl: 16 }),
            isActive
              ? "text-[#4A3A2F] font-semibold group-hover:text-[#4A3A2F] group-hover:text-opacity-80"
              : "text-[#F6EFE9] group-hover:text-[#4A3A2F] font-light",
          )}
        >
          {item.label}
          {item.hasDropdown && (
            <SvgIcon
              src="/assets/svgs/chevron-right.svg"
              ariaLabel="Dropdown"
              width={12}
              height={12}
              className={clsx(
                "mt-0.5 rotate-[90deg]",
                isActive
                  ? "text-[#4A3A2F] group-hover:text-[#4A3A2F]"
                  : "text-[#F6EFE9] group-hover:text-[#4A3A2F]",
              )}
            />
          )}
        </Link>
      </div>
    );
  };

  return (
    <NoiseBackground className="hidden lg:block w-full h-[64px] lg:h-[80px] xl:h-[100px] bg-[#805D3D] shadow-md border-b border-[#B2866D]">
      <Flex
        justify="center"
        align="center"
        className="relative h-full px-4 lg:px-8 xl:px-12 max-w-[1920px] mx-auto"
      >
        <div className="absolute -bottom-3 left-[14%]">
          <SvgIcon
            src={"/assets/svgs/star.svg"}
            ariaLabel="text"
            width={24}
            height={24}
            className="size-[24px] shrink-0 text-[#E8D6C9]"
          />
        </div>
        {/* Left Navigation */}
        <Flex align="center" justify="end" className="flex-1 xl:gap-5 lg:gap-1">
          {LEFT_NAV.map(renderNavItem)}
        </Flex>

        {/* Logo */}
        <div className="mx-8 xl:mx-16 flex-shrink-0">
          <Link to={PATHS.home} className="">
            <Image
              src="/assets/images/logo/desktop.png"
              alt="THE VEIRA NAIL LOUNGE & SPA"
              className="max-h-[50px] xl:max-h-[60px] 2xl:max-h-[70px] w-auto"
              preview={false}
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <Flex
          align="center"
          justify="start"
          className="flex-1 xl:gap-5 lg:gap-1"
        >
          {RIGHT_NAV.map(renderNavItem)}

          {/* Social Icons at the end of right nav */}
          <div className="ml-auto pl-4">
            <ListSocial />
          </div>
        </Flex>
      </Flex>
    </NoiseBackground>
  );
};

export default DesktopNav;
