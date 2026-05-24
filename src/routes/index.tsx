import { lazy } from "react";
import { PATHS } from "./Routes";
import { BRAND } from "@/config/brand.config";

// Lazy load components for better performance
const Home = lazy(() => import("../pages/Home"));
const Services = lazy(() => import("../pages/Services"));
const HostAParty = lazy(() => import("../pages/HostAParty"));
const Gallery = lazy(() => import("../pages/Gallery"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const OurPolicies = lazy(() => import("../pages/OurPolicies"));
const StyleGuide = lazy(() => import("../based/StyleGuide"));
const NotFound = lazy(() => import("../pages/NotFound"));
export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.FC>;
  title: string;
  description?: string;
}

/**
 * Application Routes Configuration
 * Centralized routing configuration for the application
 */
export const routes: RouteConfig[] = [
  {
    path: PATHS.home,
    element: Home,
    title: "Home",
    description:
      "Madison Nail Lounge in Madison, WI offers premium manicures, pedicures, nail art, and nail enhancements. Book your nail services today.",
  },
  {
    path: PATHS.services,
    element: Services,
    title: "Nail Services - Manicure, Pedicure, Nail Enhancements",
    description:
      `Discover premium nail services at ${BRAND.nameUppercase} in Madison, WI. Professional manicures, pedicures, nail enhancements, and nail art. Book your appointment today!`,
  },
  {
    path: PATHS.hostAParty,
    element: HostAParty,
    title: "Host A Party",
    description:
      `Host a memorable party at ${BRAND.nameUppercase} in Madison, WI. Perfect for birthdays, bridal parties, and group nail events. Book your private party experience today!`,
  },
  {
    path: PATHS.gallery,
    element: Gallery,
    title: "Gallery",
    description:
      `Explore our nail art gallery at ${BRAND.nameUppercase} in Madison, WI. View manicure, pedicure, and nail enhancement designs. Get inspired for your next appointment!`,
  },
  {
    path: PATHS.aboutUs,
    element: AboutUs,
    title: "About Us",
    description:
      `Learn about ${BRAND.nameUppercase} in Madison, WI. Discover our story, expert team, and commitment to premium nail care services.`,
  },
  {
    path: PATHS.contactUs,
    element: ContactUs,
    title: "Contact",
    description:
      `Contact ${BRAND.nameUppercase} in Madison, WI. Located at 795 University Ave. Call us at (608) 720-1011 or send us a message. We're here to help with all your nail care needs!`,
  },
  {
    path: PATHS.ourPolicies,
    element: OurPolicies,
    title: "Our Policies",
    description:
      `Review our salon policies and guidelines at ${BRAND.nameUppercase} in Madison, WI. Learn about our cancellation policy, appointment booking, and service terms.`,
  },
  {
    path: PATHS.styleguide,
    element: StyleGuide,
    title: "Style Guide",
    description: "Style guide for development",
  },
  {
    path: PATHS.notFound,
    element: NotFound,
    title: `404 - Page Not Found | ${BRAND.nameUppercase}`,
    description:
      `The page you're looking for doesn't exist. Return to ${BRAND.nameUppercase} homepage or explore our nail services in Madison, WI.`,
  },
];

/**
 * Get route configuration by path
 */
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find((route) => route.path === path);
};

/**
 * Get all navigation items (for navbar)
 */
export const getNavigationItems = () => {
  return routes.map((route) => ({
    path: route.path,
    label: route.title,
  }));
};
