import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../../routes/Routes";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";
import Promotion from "./components/Promotion";
import { PromotionData } from "./types";
import "./style.css";

const CAMPAIGN_TEXT_KEY = "has-show-campaign-text";
const CAMPAIGN_POPUP_KEY = "has-show-campaign-popup";
const DEFAULT_PROMOTION_TEXT =
  "GIFT CARDS ARE AVAILABLE FOR PURCHASE IN-STORE ONLY";

type NavItem = {
  path: string;
  label: string;
  hasSub?: boolean;
};

type ServiceNavItem = {
  path: string;
  label: string;
  icon: string;
  iconActive: string;
};

const navItems: NavItem[] = [
  { path: PATHS.home, label: "Home" },
  { path: PATHS.services, label: "Services", hasSub: true },
  { path: PATHS.hostAParty, label: "Host A Party" },
  { path: PATHS.gallery, label: "Gallery" },
  { path: PATHS.aboutUs, label: "About Us" },
  { path: PATHS.ourPolicies, label: "Our Policies" },
  { path: PATHS.contactUs, label: "Contact" },
];

const serviceSubmenu: ServiceNavItem[] = [
  {
    path: `${PATHS.services}#manicure`,
    label: "Manicure",
    icon: "/assets/images/Services/Manicure-gray.svg",
    iconActive: "/assets/images/Services/Manicure-gold.svg",
  },
  {
    path: `${PATHS.services}#pedicure`,
    label: "Pedicure",
    icon: "/assets/images/Services/Pedicure-gray.svg",
    iconActive: "/assets/images/Services/Pedicure-gold.svg",
  },
  {
    path: `${PATHS.services}#nails-enhancements`,
    label: "Nail Enhancements",
    icon: "/assets/images/Services/Nail-Enhancements-gray.svg",
    iconActive: "/assets/images/Services/Nail-Enhancements-gold.svg",
  },
  {
    path: `${PATHS.services}#additional-services`,
    label: "Additional Services",
    icon: "/assets/images/Services/Additional-Services-gray.svg",
    iconActive: "/assets/images/Services/Additional-Services-gold.svg",
  },
  {
    path: `${PATHS.services}#waxing`,
    label: "Waxing",
    icon: "/assets/images/Services/Waxing-gray.svg",
    iconActive: "/assets/images/Services/Waxing-gold.svg",
  },
  {
    path: `${PATHS.services}#kid-services`,
    label: "Kid's Services",
    icon: "/assets/images/Services/Kid-Services-gray.svg",
    iconActive: "/assets/images/Services/Kid-Services-gold.svg",
  },
];

const getPromotionText = (promotion?: PromotionData) =>
  promotion?.title?.trim() || DEFAULT_PROMOTION_TEXT;

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [hasDismissedCampaignText, setHasDismissedCampaignText] =
    useState(false);
  const [hasSeenCampaignPopup, setHasSeenCampaignPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      setIsHeaderSolid(window.scrollY > 0);
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
    setIsSubMenuOpen(false);
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
    <header className={isHeaderSolid ? "bg-black" : ""}>
      <Promotion
        promotion={promotion}
        promotionText={promotionText}
        showCampaignBar={shouldShowCampaignBar}
        isCampaignDismissed={hasDismissedCampaignText}
        isPopupOpen={isPopupOpen}
        onCloseCampaign={handleCloseCampaign}
        onClosePopup={handleClosePopup}
      />

      <div className="header">
        <button
          id="burger"
          className={`header__burger ${isMenuOpen ? "is-open" : ""}`}
          data-toogle-burger
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="header__burger--first" />
          <span className="header__burger--second" />
        </button>

        <div
          className={`header__menu-wrapper ${isMenuOpen ? "show-menu" : ""}`}
          data-header-wrapper
        >
          <span
            className="header__menu-overlay"
            data-close-burger
            onClick={closeMenu}
          ></span>
          <ul className="header__menu-list">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const classes = [
                "header__menu-item",
                isActive ? "active" : "",
                item.hasSub ? "has-sub" : "",
                item.hasSub && isSubMenuOpen ? "show-sub" : "",
              ]
                .filter(Boolean)
                .join(" ");

              if (item.hasSub) {
                return (
                  <li key={item.path} className={classes}>
                    <Link to={item.path} className="white" onClick={closeMenu}>
                      {item.label}
                    </Link>
                    <div
                      className="icon"
                      data-toogle-sub-menu
                      onClick={() => setIsSubMenuOpen((prev) => !prev)}
                    ></div>
                    <div className="header__sub-menu-block">
                      <ul className="header__sub-menu-list">
                        {serviceSubmenu.map((service) => (
                          <li
                            key={service.path}
                            className="header__sub-menu-item"
                          >
                            <Link
                              to={service.path}
                              className="white"
                              onClick={closeMenu}
                            >
                              <img
                                src={service.icon}
                                alt={`${service.label} icon`}
                                className="icon"
                              />
                              <img
                                src={service.iconActive}
                                alt={`${service.label} active icon`}
                                className="icon active"
                              />
                              <p>{service.label}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.path} className={classes}>
                  <Link to={item.path} className="white" onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Link
          to={PATHS.home}
          className="header__block-logo"
          title="Madison Nail Lounge"
          onClick={closeMenu}
        >
          <img
            src="/assets/images/Logo/logo-desktop.png"
            alt="Madison Nail Lounge"
            className="logo"
          />
        </Link>

        <div className="header__contact">
          <a
            className="header__contact-phone"
            href="tel:6087201011"
            title="Call Madison Nail Lounge"
          >
            (608) 720 1011
          </a>
          <address className="header__contact-address">
            <i className="bi bi-geo-alt" /> 795 University Ave, Madison, WI
            53715
          </address>
          <ul className="social-list">
            <li>
              <a
                className="social-item"
                href="https://www.instagram.com/madisonnaillounge/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="social-icon bi bi-instagram"></i>
                <span className="hidden-text">Instagram</span>
              </a>
            </li>
            <li>
              <a
                className="social-item"
                href="https://www.facebook.com/madisonnailloungewi"
                target="_blank"
                rel="noreferrer"
              >
                <i className="social-icon bi bi-facebook"></i>
                <span className="hidden-text">Facebook</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
