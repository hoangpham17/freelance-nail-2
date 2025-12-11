import React from "react";
import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type?: "LocalBusiness" | "Organization" | "Service";
  data?: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const defaultLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "THE VEIRA NAIL LOUNGE & SPA",
    image:
      typeof window !== "undefined"
        ? `${window.location.origin}/assets/images/Logo/logo-desktop.png`
        : "",
    "@id": typeof window !== "undefined" ? window.location.origin : "",
    url: typeof window !== "undefined" ? window.location.origin : "",
    telephone: "+1-608-720-1011",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "795 University Ave",
      addressLocality: "Madison",
      addressRegion: "WI",
      postalCode: "53517",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.0730802,
      longitude: -89.3986882,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/madisonnailloungewi",
      "https://www.instagram.com/madisonnaillounge/",
    ],
  };

  const structuredData = data || defaultLocalBusiness;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
