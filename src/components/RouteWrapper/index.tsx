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

  // Get keywords based on route
  const getKeywords = () => {
    if (location.pathname === "/services") {
      return "nail services, manicure, pedicure, nail enhancements, nail art, waxing, spa treatments, Madison WI nail salon, professional nail care, gel nails, dip powder, acrylic nails, nail extensions";
    }
    return undefined;
  };

  const keywords = getKeywords();

  // Determine structured data type based on route
  const getStructuredDataType = () => {
    if (location.pathname === "/") {
      return "LocalBusiness";
    }
    if (location.pathname === "/services") {
      return "Service";
    }
    return undefined;
  };

  const structuredDataType = getStructuredDataType();

  return (
    <>
      {/* SEO components are loaded immediately, not lazy */}
      {/* This ensures meta tags are in initial HTML for search engines */}
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={keywords}
        url={
          typeof window !== "undefined"
            ? `${window.location.origin}${location.pathname}`
            : ""
        }
      />
      {/* Structured Data for home and services pages */}
      {structuredDataType && (
        <StructuredData type={structuredDataType} />
      )}
      {/* Lazy loaded page content */}
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </>
  );
};

export default RouteWrapper;
