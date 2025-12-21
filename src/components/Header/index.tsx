import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Flex, Image } from "antd";
import { PATHS } from "../../routes/Routes";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";
import Promotion from "./components/Promotion";
import { PromotionData } from "./types";
import clsx from "clsx";
import { responsiveFontSizeArray } from "../../shared/utils/helper";
import { ListSocial } from "./components/ListSocial";
import { ButtonStyle1 } from "../../based/components/Button/Style1";
import { BurgerMenu } from "./components/BurgerMenu";
import { Wrapper } from "@/based/components/Wrapper";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { useScreen } from "@/hooks/useScreen";
import { useCheckOpacityHeader } from "@/hooks/useCheckOpacityHeader";
import ServicesSubmenu from "./components/ServicesSubmenu";
import SvgIcon from "@/based/SvgIcon";

const CAMPAIGN_TEXT_KEY = "has-show-campaign-text";
const CAMPAIGN_POPUP_KEY = "has-show-campaign-popup";
const DEFAULT_PROMOTION_TEXT =
  "GIFT CARDS ARE AVAILABLE FOR PURCHASE IN-STORE ONLY";

type NavItem = {
  path: string;
  label: string;
};

const navItems: NavItem[] = [
  { path: PATHS.home, label: "HOME" },
  { path: PATHS.services, label: "SERVICES" },
  { path: PATHS.hostAParty, label: "HOST A PARTY" },
  { path: PATHS.gallery, label: "GALLERY" },
  { path: PATHS.aboutUs, label: "ABOUT US" },
  { path: PATHS.ourPolicies, label: "OUR POLICIES" },
];

const getPromotionText = (promotion?: PromotionData) =>
  promotion?.title?.trim() || DEFAULT_PROMOTION_TEXT;

const Header: React.FC = () => {
  const location = useLocation();
  const isOpacityHeader = useCheckOpacityHeader();

  const { isDesktop } = useScreen();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [hasDismissedCampaignText, setHasDismissedCampaignText] =
    useState(false);
  const [hasSeenCampaignPopup, setHasSeenCampaignPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setShowCampaignBar = useCampaignStore(
    (state) => state.setShowCampaignBar
  );

  const { data: promotionData } = useAirtable<PromotionData>(
    AIRTABLE_ENDPOINTS.promotion
  );

  const promotion = promotionData?.[0];
  const promotionText = getPromotionText(promotion);

  const hasCampaignCopy = useMemo(
    () => Boolean(promotion?.title?.trim()),
    [promotion]
  );

  const isPromotionActive = useMemo(() => {
    if (!promotion) return false;
    const now = Math.floor(Date.now() / 1000);
    const start = promotion.start_date ?? 0;
    const end = promotion.end_date ?? now + 1;
    return Boolean(promotion.enabled) && now >= start && now <= end;
  }, [promotion]);

  const canShowCampaignText = isPromotionActive && hasCampaignCopy;
  const canShowPopup =
    isPromotionActive && Boolean(promotion?.icon || promotion?.image);

  const shouldShowCampaignBar =
    canShowCampaignText && !hasDismissedCampaignText && !isHeaderSolid;

  const shouldQueuePopup = canShowPopup && !hasSeenCampaignPopup;

  const hasPendingCampaign =
    (canShowCampaignText && !hasDismissedCampaignText) ||
    shouldQueuePopup ||
    isPopupOpen;

  // Sync global store so other pages can know campaign bar visibility
  useEffect(() => {
    setShowCampaignBar(shouldShowCampaignBar);
  }, [setShowCampaignBar, shouldShowCampaignBar]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHasDismissedCampaignText(
      sessionStorage.getItem(CAMPAIGN_TEXT_KEY) === "true"
    );
    setHasSeenCampaignPopup(
      sessionStorage.getItem(CAMPAIGN_POPUP_KEY) === "true"
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setIsHeaderSolid(window.scrollY > 50);
      setIsAtTop(window.scrollY === 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!shouldQueuePopup) {
      setIsPopupOpen(false);
      return;
    }
    const timer = window.setTimeout(() => setIsPopupOpen(true), 800);
    return () => window.clearTimeout(timer);
  }, [shouldQueuePopup]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (isMenuOpen || isPopupOpen) {
      html.classList.add("freeze");
    } else {
      html.classList.remove("freeze");
    }
    return () => {
      html.classList.remove("freeze");
    };
  }, [isMenuOpen, isPopupOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (shouldShowCampaignBar) {
      html.classList.add("show-campaign");
    } else {
      html.classList.remove("show-campaign");
    }
    return () => {
      html.classList.remove("show-campaign");
    };
  }, [shouldShowCampaignBar]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (hasPendingCampaign) {
      html.classList.add("has-campaign");
    } else {
      html.classList.remove("has-campaign");
    }
    return () => {
      html.classList.remove("has-campaign");
    };
  }, [hasPendingCampaign]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCloseCampaign = () => {
    setHasDismissedCampaignText(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(CAMPAIGN_TEXT_KEY, "true");
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setHasSeenCampaignPopup(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(CAMPAIGN_POPUP_KEY, "true");
    }
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-[100] shadow-[2px_6px_6px_0px_#0000000F]",
        isOpacityHeader && isAtTop ? "bg-white/60" : "bg-white"
      )}
    >
      <Promotion
        promotion={promotion}
        promotionText={promotionText}
        showCampaignBar={shouldShowCampaignBar}
        isCampaignDismissed={hasDismissedCampaignText}
        isPopupOpen={isPopupOpen}
        onCloseCampaign={handleCloseCampaign}
        onClosePopup={handleClosePopup}
      />

      {/* Main Header */}
      <Wrapper className="px-4 md:px-4 lg:px-8">
        <Flex
          justify="space-between"
          align="center"
          gap={16}
          className="h-[64px] lg:h-[100px]"
        >
          <BurgerMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
          <Link
            to={PATHS.home}
            onClick={closeMenu}
            className="flex-shrink-0 max-h-[32px] md:max-h-[45px] lg:max-h-[70px]"
          >
            {isDesktop ? (
              <Image
                src="/assets/images/logo/desktop.png"
                alt="THE VEIRA NAIL LOUNGE & SPA"
                className="max-h-[40px] xl:max-h-[70px]"
                preview={false}
              />
            ) : (
              <Image
                src="/assets/images/logo/mobile.png"
                alt="THE VEIRA NAIL LOUNGE & SPA"
                className="max-h-[32px] md:max-h-[45px]"
                preview={false}
              />
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center relative h-full">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const isServices = item.path === PATHS.services;

              return (
                <div
                  key={item.path}
                  className={clsx(
                    "relative h-full flex items-center",
                    isServices && "group"
                  )}
                  onMouseEnter={() => {
                    if (isServices) {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                        hoverTimeoutRef.current = null;
                      }
                      setIsServicesHovered(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isServices) {
                      // Delay hiding to allow mouse to move to submenu
                      hoverTimeoutRef.current = setTimeout(() => {
                        setIsServicesHovered(false);
                      }, 150);
                    }
                  }}
                >
                  <Link
                    to={item.path}
                    className={clsx(
                      "uppercase transition-colors text-center h-full flex items-center",
                      responsiveFontSizeArray(14, 16),
                      isActive
                        ? "!text-[#9E7B6A] font-semibold"
                        : "text-[#0F172A] hover:text-[#9E7B6A]"
                    )}
                  >
                    {item.label}
                  </Link>
                  {isServices && (
                    <>
                      <div
                        className="absolute top-full left-0 right-0 h-2 bg-transparent"
                        onMouseEnter={() => {
                          if (hoverTimeoutRef.current) {
                            clearTimeout(hoverTimeoutRef.current);
                            hoverTimeoutRef.current = null;
                          }
                          setIsServicesHovered(true);
                        }}
                        onMouseLeave={() => {
                          hoverTimeoutRef.current = setTimeout(() => {
                            setIsServicesHovered(false);
                          }, 150);
                        }}
                      />
                      <ServicesSubmenu
                        isVisible={isServicesHovered}
                        onMouseEnter={() => {
                          if (hoverTimeoutRef.current) {
                            clearTimeout(hoverTimeoutRef.current);
                            hoverTimeoutRef.current = null;
                          }
                          setIsServicesHovered(true);
                        }}
                        onMouseLeave={() => {
                          hoverTimeoutRef.current = setTimeout(() => {
                            setIsServicesHovered(false);
                          }, 150);
                        }}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex flex-col items-end gap-1 lg:flex-row lg:items-center lg:gap-4 flex-shrink-0">
            {/* Phone Number - Mobile Only */}
            <a
              href="tel:608000000"
              className="lg:hidden text-[#8B7355] text-sm font-medium"
            >
              (608) 000 000
            </a>

            <ListSocial />
            <Link to={PATHS.contactUs} className="hidden lg:block">
              <ButtonStyle1 className="font-lexend">CONTACT US</ButtonStyle1>
            </Link>
          </div>
        </Flex>
      </Wrapper>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-[100] transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Wrapper className="h-full flex flex-col">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between h-[64px] px-4 border-b border-gray-100">
            <Link
              to={PATHS.home}
              onClick={closeMenu}
              className="flex-shrink-0 max-h-[32px]"
            >
              <Image
                src="/assets/images/logo/mobile.png"
                alt="THE VEIRA NAIL LOUNGE & SPA"
                className="max-h-[32px]"
                preview={false}
              />
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 flex items-center justify-center"
              aria-label="Close menu"
            >
              <SvgIcon
                src={"/assets/svgs/x-close.svg"}
                ariaLabel="Close menu"
                width={24}
                height={24}
                className="size-[24px] shrink-0 text-[#0F172A]"
              />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="flex flex-col pt-8 px-6 pb-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={clsx(
                      "block py-3 font-lexend uppercase transition-colors",
                      responsiveFontSizeArray(16, 18),
                      isActive
                        ? "text-[#9E7B6A] font-semibold"
                        : "text-[#0F172A] hover:text-[#9E7B6A]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="border-t border-gray-100 px-6 py-6 space-y-4">
            <div className="flex flex-col gap-4">
              <Link to={PATHS.contactUs} onClick={closeMenu} className="w-full">
                <ButtonStyle1 className="font-lexend w-full">
                  CONTACT US
                </ButtonStyle1>
              </Link>
              <a
                href="tel:608000000"
                onClick={closeMenu}
                className="text-[#8B7355] text-base font-medium text-center"
              >
                (608) 000 000
              </a>
            </div>
            <div className="flex justify-center pt-2">
              <ListSocial />
            </div>
          </div>
        </Wrapper>
      </div>
    </header>
  );
};

export default Header;
