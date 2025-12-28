import { lazy } from "react";
import { PATHS } from "./Routes";

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
    description: "Welcome to VEIRA NAIL LOUNGE & SPA",
  },
  {
    path: PATHS.services,
    element: Services,
    title:
      "Nail Services & Spa Treatments - Manicure, Pedicure, Nail Enhancements",
    description:
      "Discover our comprehensive range of premium nail services at THE VEIRA NAIL LOUNGE & SPA in Madison, WI. Professional manicures, pedicures, nail enhancements, waxing, and spa treatments. Book your appointment today!",
  },
  {
    path: PATHS.hostAParty,
    element: HostAParty,
    title: "Host A Party",
    description: "Book a party at our salon",
  },
  {
    path: PATHS.gallery,
    element: Gallery,
    title: "Gallery",
    description: "View our work",
  },
  {
    path: PATHS.aboutUs,
    element: AboutUs,
    title: "About Us",
    description: "Learn more about us",
  },
  {
    path: PATHS.contactUs,
    element: ContactUs,
    title: "Contact",
    description: "Get in touch with us",
  },
  {
    path: PATHS.ourPolicies,
    element: OurPolicies,
    title: "Our Policies",
    description: "Salon policies and guidelines",
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
    title: "404 - Page Not Found | THE VEIRA NAIL LOUNGE & SPA",
    description:
      "The page you're looking for doesn't exist. Return to THE VEIRA NAIL LOUNGE & SPA homepage or explore our services in Madison, WI.",
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
