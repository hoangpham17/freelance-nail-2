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
import { BurgerMenu } from "./components/BurgerMenu";
import { Wrapper } from "@/based/components/Wrapper";
import { useCampaignStore } from "@/shared/store/campaignStore";
import ServicesSubmenu from "./components/ServicesSubmenu";
import SvgIcon from "@/based/SvgIcon";
import { useServiceCategories } from "@/hooks/useServiceCategories";
import DesktopNav from "./components/DesktopNav";
import { ListSocial } from "./components/ListSocial";

const CAMPAIGN_TEXT_KEY = "has-show-campaign-text";
const CAMPAIGN_POPUP_KEY = "has-show-campaign-popup";

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

const Header: React.FC = () => {
  const location = useLocation();

  const isServicesPage = location.pathname === PATHS.services;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [hasDismissedCampaignText, setHasDismissedCampaignText] =
    useState(false);
  const [hasSeenCampaignPopup, setHasSeenCampaignPopup] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerMainRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const setShowCampaignBar = useCampaignStore(
    (state) => state.setShowCampaignBar,
  );
  const setHeaderHeightStore = useCampaignStore(
    (state) => state.setHeaderHeight,
  );
  const isShowPopupCampaign = useCampaignStore(
    (state) => state.isShowPopupCampaign,
  );
  const setIsShowPopupCampaign = useCampaignStore(
    (state) => state.setIsShowPopupCampaign,
  );
  const setHasPopupCampaign = useCampaignStore(
    (state) => state.setHasPopupCampaign,
  );

  const { data: promotionData } = useAirtable<PromotionData>(
    AIRTABLE_ENDPOINTS.promotion,
  );

  // Filter and check active promotions by type
  const { textPromotions, imagePromotions } = useMemo(() => {
    if (!promotionData || promotionData.length === 0) {
      return { textPromotions: [], imagePromotions: [] };
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of day for comparison

    const textPromos: PromotionData[] = [];
    const imagePromos: PromotionData[] = [];

    promotionData.forEach((promotion) => {
      // Check if promotion is active
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

      const isEnabled = Boolean(promotion.enabled);
      const isAfterStart = !startDate || now >= startDate;
      const isBeforeEnd = !endDate || now <= endDate;
      const isActive = isEnabled && isAfterStart && isBeforeEnd;

      if (!isActive) return;

      // Filter by type
      if (
        promotion.type === "Text" &&
        (promotion.Content?.trim() || promotion.title?.trim())
      ) {
        textPromos.push(promotion);
      } else if (
        promotion.type === "Image" &&
        promotion.image &&
        Array.isArray(promotion.image) &&
        promotion.image.length > 0
      ) {
        imagePromos.push(promotion);
      }
    });

    // Sort by order field (or index as fallback) within each type
    textPromos.sort(
      (a, b) => (a.order ?? a.index ?? 0) - (b.order ?? b.index ?? 0),
    );
    imagePromos.sort(
      (a, b) => (a.order ?? a.index ?? 0) - (b.order ?? b.index ?? 0),
    );

    return { textPromotions: textPromos, imagePromotions: imagePromos };
  }, [promotionData]);

  // Check if there are any enabled popup campaigns
  useEffect(() => {
    const popupCampaign = imagePromotions.filter(
      (promotion) => promotion.type === "Image",
    );
    if (popupCampaign?.some((promotion) => promotion.enabled)) {
      setHasPopupCampaign(true);
    }
  }, [imagePromotions, setHasPopupCampaign]);

  const hasCampaignCopy = useMemo(
    () => textPromotions.length > 0,
    [textPromotions],
  );

  const canShowCampaignText = hasCampaignCopy;
  const canShowPopup = imagePromotions.length > 0;

  const shouldShowCampaignBar =
    canShowCampaignText && !hasDismissedCampaignText && !isHeaderSolid;

  const shouldQueuePopup = canShowPopup && !hasSeenCampaignPopup;

  const hasPendingCampaign =
    (canShowCampaignText && !hasDismissedCampaignText) ||
    shouldQueuePopup ||
    isShowPopupCampaign;

  // Sync global store so other pages can know campaign bar visibility
  useEffect(() => {
    setShowCampaignBar(shouldShowCampaignBar);
  }, [setShowCampaignBar, shouldShowCampaignBar]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasSeenPopup = sessionStorage.getItem(CAMPAIGN_POPUP_KEY) === "true";
    setHasDismissedCampaignText(
      sessionStorage.getItem(CAMPAIGN_TEXT_KEY) === "true",
    );
    setHasSeenCampaignPopup(hasSeenPopup);
    // If popup was already seen (closed), set isShowPopupCampaign to false (show button)
    // Only apply when load page first time
    if (hasSeenPopup) {
      setIsShowPopupCampaign(false);
    }
  }, [setIsShowPopupCampaign]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;

      setIsHeaderSolid((prev) => {
        const next = scrollY > 50;
        return prev === next ? prev : next;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollState);
      }
    };

    // Initialize state based on current scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-open popup on first load if not seen before
  useEffect(() => {
    if (!shouldQueuePopup) {
      return;
    }
    // Auto-open popup after 800ms if not seen before
    const timer = window.setTimeout(() => {
      if (imagePromotions.length > 0) {
        setIsShowPopupCampaign(true);
      }
    }, 800);
    return () => window.clearTimeout(timer);
  }, [shouldQueuePopup, imagePromotions.length, setIsShowPopupCampaign]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (isMenuOpen || isShowPopupCampaign) {
      html.classList.add("freeze");
    } else {
      html.classList.remove("freeze");
    }
    return () => {
      html.classList.remove("freeze");
    };
  }, [isMenuOpen, isShowPopupCampaign]);

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

  return (
    <header className="fixed top-0 left-0 w-full z-[98] bg-black">
      <Promotion
        textPromotions={textPromotions}
        showCampaignBar={shouldShowCampaignBar}
        isCampaignDismissed={hasDismissedCampaignText}
        onCloseCampaign={handleCloseCampaign}
      />

      <div ref={headerMainRef}>
        {/* Desktop Header */}
        <DesktopNav
          isServicesHovered={isServicesHovered}
          setIsServicesHovered={setIsServicesHovered}
          hoverTimeoutRef={hoverTimeoutRef}
          isServicesPage={isServicesPage}
        />

        {/* Services Dropdown (Desktop) */}
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

        {/* Mobile Header */}
        <div className="lg:hidden w-full h-[64px] border-b border-madison-border/40 bg-black">
          <Wrapper className="px-4">
            <Flex
              justify="space-between"
              align="center"
              className="h-[64px]"
            >
              <BurgerMenu toggleMenu={toggleMenu} />
              <Link
                to={PATHS.home}
                onClick={closeMenu}
                className="flex items-center justify-center"
              >
                <Image
                  src="/assets/images/logo/desktop.png"
                  alt="Logo"
                  className="max-h-[32px] md:max-h-[45px] !w-auto"
                  preview={false}
                />
              </Link>
              <ListSocial />
            </Flex>
          </Wrapper>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "lg:hidden fixed inset-0 bg-black z-[98] transform transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ height: "100dvh" }}
      >
        <Flex vertical className="h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between h-[56px] px-4 border-b border-madison-border">
            <Link
              to={PATHS.home}
              onClick={closeMenu}
              className="flex items-center justify-center"
            >
              <Image
                src="/assets/images/logo/desktop.png"
                alt="Logo"
                className="max-h-[32px] !w-auto"
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
                className="size-[24px] shrink-0 text-white"
              />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto pb-20">
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
                      }),
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
                            "w-full flex items-center justify-between py-3 uppercase transition-colors text-base px-5 relative font-montserrat",
                            isActive ? "bg-madison-surface text-madison-gold" : "font-medium text-madison-muted",
                          )}
                          style={{
                            boxShadow: isServicesExpanded
                              ? "0px 4px 6px 0px #0000000F"
                              : "none",
                          }}
                        >
                          <span className="flex items-center gap-2">
                            {item.label}
                            {isActive && (
                              <SvgIcon
                                src={"/assets/svgs/star.svg"}
                                ariaLabel="Active"
                                width={16}
                                height={16}
                                className="shrink-0 text-white"
                              />
                            )}
                          </span>
                          <Flex className="w-6 h-6 items-center justify-center">
                            <SvgIcon
                              src={"/assets/svgs/chevron-right.svg"}
                              ariaLabel="Toggle submenu"
                              width={12}
                              height={12}
                              className={clsx(
                                "shrink-0 transition-transform duration-200 text-white",
                                isServicesExpanded && "rotate-90",
                              )}
                            />
                          </Flex>
                        </button>
                        {isServicesExpanded && serviceNavItems.length > 0 && (
                          <ul className="px-8 space-y-1 list-none bg-madison-surface/80">
                            {serviceNavItems.map((subItem) => {
                              const isSubActive = checkIsActive(subItem.slug);
                              return (
                                <li key={subItem.path}>
                                  <Link
                                    to={subItem.path}
                                    onClick={closeMenu}
                                    className={clsx(
                                      "flex items-center justify-between py-2 px-4 capitalize transition-colors text-base rounded-2xl text-madison-muted font-montserrat",
                                      isSubActive
                                        ? "bg-madison-surface text-madison-gold"
                                        : "",
                                    )}
                                  >
                                    <span>{subItem.label}</span>
                                    {isSubActive && (
                                      <SvgIcon
                                        src={"/assets/svgs/star.svg"}
                                        ariaLabel="Active"
                                        width={16}
                                        height={16}
                                        className="shrink-0 text-white"
                                      />
                                    )}
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
                          "flex items-center justify-between py-3 uppercase transition-colors px-5 font-montserrat text-madison-muted",
                          responsiveFontSizeArray(16, 18),
                          isActive ? "bg-madison-surface text-madison-gold" : "font-medium",
                        )}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <SvgIcon
                            src={"/assets/svgs/star.svg"}
                            ariaLabel="Active"
                            width={16}
                            height={16}
                            className="shrink-0 text-white"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-madison-border flex flex-col items-center gap-4 py-8 z-10 px-6">
            <a
              href="https://booking.spacepos.net/?id=jzOR8l!BpuM="
              target="_blank"
              rel="noreferrer"
              className="madison-btn-primary w-full max-w-xs"
            >
              Booking Now
            </a>
            {/* <ListSocial /> */}
          </div>
        </Flex>
      </div>
    </header>
  );
};

export default Header;
