import { lazy } from "react";
import { PATHS } from "./Routes";

// Lazy load components for better performance
const Home = lazy(() => import("../pages/Home/Home"));
const Services = lazy(() => import("../pages/Services/Services"));
const HostAParty = lazy(() => import("../pages/HostAParty/HostAParty"));
const Gallery = lazy(() => import("../pages/Gallery/Gallery"));
const AboutUs = lazy(() => import("../pages/AboutUs/AboutUs"));
const OurPolicies = lazy(() => import("../pages/OurPolicies/OurPolicies"));

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
    description: "Welcome to Madison Nail Lounge",
  },
  {
    path: PATHS.services,
    element: Services,
    title: "Services",
    description: "Our nail care services",
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
    path: PATHS.ourPolicies,
    element: OurPolicies,
    title: "Our Policies",
    description: "Salon policies and guidelines",
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

