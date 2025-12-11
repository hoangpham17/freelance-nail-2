import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteByPath } from "@/routes";

/**
 * Hook to automatically get route information for SEO
 * Use this hook in pages to get route config for SEO component
 */
export const useSEO = () => {
  const location = useLocation();
  const route = getRouteByPath(location.pathname);

  useEffect(() => {
    // Route information is available for SEO setup
    // Use this hook to get route config and pass to SEO component
  }, [location.pathname, route]);

  return route;
};

export default useSEO;
