import React, { useEffect, useMemo, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [hasDismissedCampaignText, setHasDismissedCampaignText] =
    useState(false);
  const [hasSeenCampaignPopup, setHasSeenCampaignPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-[2px_6px_6px_0px_#0000000F]">
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
          className="py-3 md:py-5"
        >
          <BurgerMenu toggleMenu={toggleMenu} />
          <Link
            to={PATHS.home}
            onClick={closeMenu}
            className="flex-shrink-0 max-h-[32px] md:max-h-[45px] 2xl:max-h-[70px]"
          >
            <Image
              src="/assets/images/Logo/logo-desktop.png"
              alt="THE VEIRA NAIL LOUNGE & SPA"
              className="max-h-[32px] md:max-h-[45px] 2xl:max-h-[70px]"
              preview={false}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "font-lexend uppercase transition-colors",
                    responsiveFontSizeArray(14, 16),
                    isActive
                      ? "text-[#8B7355] font-semibold"
                      : "text-[#0F172A] hover:text-[#A67C52]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-4 flex-shrink-0">
            {/* Phone Number - Mobile Only */}
            <a
              href="tel:608000000"
              className="md:hidden text-[#8B7355] text-sm font-medium"
            >
              (608) 000 000
            </a>

            <ListSocial />
            <Link to={PATHS.contactUs} className="hidden md:block">
              <ButtonStyle1 className="font-lexend">CONTACT US</ButtonStyle1>
            </Link>
          </div>
        </Flex>
      </Wrapper>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 px-6">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`text-lg font-lexend uppercase transition-colors ${
                    isActive
                      ? "text-[#8B7355] font-semibold"
                      : "text-[#8B7355] hover:text-[#A67C52]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
