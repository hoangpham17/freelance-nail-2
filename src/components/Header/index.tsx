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
import ServicesSubmenu from "./components/ServicesSubmenu";
import SvgIcon from "@/based/SvgIcon";
import { useServiceCategories } from "@/hooks/useServiceCategories";

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

  const isServicesPage = location.pathname === PATHS.services;

  const { isDesktop } = useScreen();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [hasDismissedCampaignText, setHasDismissedCampaignText] =
    useState(false);
  const [hasSeenCampaignPopup, setHasSeenCampaignPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerMainRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const setShowCampaignBar = useCampaignStore(
    (state) => state.setShowCampaignBar
  );
  const setHeaderHeightStore = useCampaignStore(
    (state) => state.setHeaderHeight
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

    // Parse date strings (YYYY-MM-DD) to Date objects
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of day for comparison

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (promotion.start_date) {
      startDate = new Date(promotion.start_date);
      startDate.setHours(0, 0, 0, 0);
    }

    if (promotion.end_date) {
      endDate = new Date(promotion.end_date);
      endDate.setHours(23, 59, 59, 999); // Set to end of day
    }

    // Check if promotion is enabled and within date range
    const isEnabled = Boolean(promotion.enabled);
    const isAfterStart = !startDate || now >= startDate;
    const isBeforeEnd = !endDate || now <= endDate;

    return isEnabled && isAfterStart && isBeforeEnd;
  }, [promotion]);

  const canShowCampaignText = isPromotionActive && hasCampaignCopy;
  const canShowPopup =
    isPromotionActive &&
    Boolean(
      promotion?.image &&
        Array.isArray(promotion.image) &&
        promotion.image.length > 0
    );

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

  // Measure header height using ref and store it globally
  useEffect(() => {
    const element = headerMainRef.current;
    if (!element) return;

    // Measure initial height
    const height = element.offsetHeight;
    setHeaderHeight(height); // Update local state
    setHeaderHeightStore(height); // Update global store

    // Observe changes in header height (responsive, content changes, etc.)
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const newHeight = entry.contentRect.height;
      setHeaderHeight(newHeight); // Update local state
      setHeaderHeightStore(newHeight); // Update global store
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setHeaderHeight, setHeaderHeightStore]);

  const { categories: serviceCategories } = useServiceCategories();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesExpanded(false);
  };

  const toggleServicesExpanded = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsServicesExpanded((prev) => !prev);
  };

  // Auto-expand Services submenu if on Services page when menu opens
  useEffect(() => {
    if (isMenuOpen && location.pathname === PATHS.services) {
      setIsServicesExpanded(true);
    } else if (!isMenuOpen) {
      setIsServicesExpanded(false);
    }
  }, [isMenuOpen, location.pathname]);

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
        "fixed top-0 left-0 w-full z-[98] shadow-[2px_6px_6px_0px_#0000000F]",
        isAtTop ? "bg-white/60" : "bg-white"
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
      <Wrapper className="px-4 md:px-4 lg:px-8 overflow-hidden">
        <Flex
          ref={headerMainRef}
          justify="space-between"
          align="center"
          gap={16}
          className="h-[64px] xl:h-[100px] lg:h-[80px]"
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

          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center relative h-full"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-6 xl:gap-8 h-full list-none m-0 p-0">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isServices = item.path === PATHS.services;

                return (
                  <li
                    key={item.path}
                    className={clsx(
                      "relative h-full flex items-center",
                      isServices && "group"
                    )}
                    onMouseEnter={() => {
                      if (isServicesPage) return;
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
                        responsiveFontSizeArray(14, 16, { lg: 12 }),
                        isActive
                          ? "!text-[#9E7B6A]"
                          : "text-[#0F172A] hover:text-[#9E7B6A]"
                      )}
                    >
                      {item.label}
                    </Link>
                    {isServices && !isServicesPage && (
                      <>
                        <div
                          className={
                            "absolute top-full left-0 right-0 h-2 bg-transparent"
                          }
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
                          headerHeight={headerHeight}
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
                  </li>
                );
              })}
            </ul>
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
        className={`lg:hidden fixed inset-0 bg-white z-[98] transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Flex vertical className="h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-end h-[56px]">
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
            <nav className="flex flex-col" aria-label="Mobile navigation">
              <ul className="flex flex-col list-none m-0 p-0">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const isServices = item.path === PATHS.services;

                  if (isServices) {
                    const serviceNavItems = serviceCategories.map(
                      (category) => ({
                        path: `${PATHS.services}#${category.slug}`,
                        label: category.title,
                        slug: category.slug,
                      })
                    );

                    const checkIsActive = (slug: string) => {
                      const isServicesPage =
                        location.pathname === PATHS.services;
                      const currentHash = location.hash.replace("#", "");
                      return isServicesPage && currentHash === slug;
                    };

                    return (
                      <li key={item.path} className="w-full">
                        <button
                          onClick={toggleServicesExpanded}
                          className={clsx(
                            "w-full flex items-center justify-between py-3 uppercase transition-colors text-base px-5",
                            isActive
                              ? "text-[#9E7B6A] font-semibold"
                              : "text-[#0F172A]",
                            isServicesExpanded && "border-b border-[#D5B994]"
                          )}
                          style={{
                            boxShadow: isServicesExpanded
                              ? "0px 4px 6px 0px #0000000F"
                              : "none",
                          }}
                        >
                          <span>{item.label}</span>
                          <Flex className="w-6 h-6 items-center justify-center rounded-full bg-[#F4F4F5]">
                            <SvgIcon
                              src={"/assets/svgs/chevron-right.svg"}
                              ariaLabel="Toggle submenu"
                              width={8}
                              height={8}
                              className={clsx(
                                "size-2 shrink-0 transition-transform duration-200 text-[#333333]",
                                isServicesExpanded && "rotate-90"
                              )}
                            />
                          </Flex>
                        </button>
                        {isServicesExpanded && serviceNavItems.length > 0 && (
                          <ul className="px-8 mt-2 space-y-1 list-none">
                            {serviceNavItems.map((subItem) => {
                              const isSubActive = checkIsActive(subItem.slug);
                              return (
                                <li key={subItem.path}>
                                  <Link
                                    to={subItem.path}
                                    onClick={closeMenu}
                                    className={clsx(
                                      "block py-2 capitalize transition-colors font-light text-base",
                                      isSubActive
                                        ? "border-b border-[#D5B994CC]"
                                        : "text-[#8B4B20]"
                                    )}
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        className={clsx(
                          "block py-3 font-lexend uppercase transition-colors px-5",
                          responsiveFontSizeArray(16, 18),
                          isActive
                            ? "text-[#9E7B6A] font-semibold"
                            : "text-[#0F172A] hover:text-[#9E7B6A]"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="pt-20 bg-[#F7F7F7CC] border-t border-[#D5B994]"></div>
        </Flex>
      </div>
    </header>
  );
};

export default Header;
