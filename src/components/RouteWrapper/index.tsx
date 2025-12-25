import React, { Suspense, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getRouteByPath } from "@/routes";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import LoadingPage from "@/components/LoadingPage";

interface RouteWrapperProps {
  children: React.ReactNode;
}

/**
 * RouteWrapper component
 * Wraps routes to ensure SEO components are loaded immediately
 * even when the route component is lazy loaded
 * This ensures meta tags are in the initial HTML for better SEO
 */
const RouteWrapper: React.FC<RouteWrapperProps> = ({ children }) => {
  const location = useLocation();
  const route = getRouteByPath(location.pathname);
  const previousPathnameRef = useRef<string>("");

  // Scroll to top when pathname changes (but not when only hash changes)
  useEffect(() => {
    const currentPathname = location.pathname;

    // Only scroll if pathname actually changed (not just hash)
    if (currentPathname !== previousPathnameRef.current) {
      previousPathnameRef.current = currentPathname;

      // Scroll to top when navigating to a new page
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [location.pathname]);

  // Get SEO data from route config
  const seoTitle = route?.title || "THE VEIRA NAIL LOUNGE & SPA";
  const seoDescription =
    route?.description ||
    "Experience luxury nail care services at THE VEIRA NAIL LOUNGE & SPA. Professional manicures, pedicures, nail enhancements, and spa treatments in Madison, WI.";

  return (
    <>
      {/* SEO components are loaded immediately, not lazy */}
      {/* This ensures meta tags are in initial HTML for search engines */}
      <SEO
        title={seoTitle}
        description={seoDescription}
        url={
          typeof window !== "undefined"
            ? `${window.location.origin}${location.pathname}`
            : ""
        }
      />
      {/* Structured Data only on home page */}
      {location.pathname === "/" && <StructuredData type="LocalBusiness" />}
      {/* Lazy loaded page content */}
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </>
  );
};

export default RouteWrapper;
