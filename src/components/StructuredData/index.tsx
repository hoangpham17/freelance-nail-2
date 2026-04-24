import React from "react";
import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type?: "LocalBusiness" | "Organization" | "Service";
  data?: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const defaultLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "THE VEIRA NAIL LOUNGE & SPA",
    alternateName: [
      "The Veira",
      "The Veira Nail",
      "The Veira Spa",
      "The Veira Nail Spa",
      "THE VEIRA NAIL LOUNGE & SPA",
      "veira nail",
      "veira spa",
      "veira nail spa",
      "veira nail salon",
      "veira spa salon",
      "veira nail salon Madison WI",
      "veira spa salon Madison WI",
    ],
    image:
      typeof window !== "undefined"
        ? `${window.location.origin}/assets/images/logo/desktop.png`
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
      postalCode: "53715",
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

  const defaultService = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Nail Care Services",
    provider: {
      "@type": "LocalBusiness",
      name: "THE VEIRA NAIL LOUNGE & SPA",
      address: {
        "@type": "PostalAddress",
        streetAddress: "795 University Ave",
        addressLocality: "Madison",
        addressRegion: "WI",
        postalCode: "53715",
        addressCountry: "US",
      },
      telephone: "+1-608-720-1011",
    },
    areaServed: {
      "@type": "City",
      name: "Madison",
      containedIn: {
        "@type": "State",
        name: "Wisconsin",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nail Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Manicure Services",
        },
        {
          "@type": "OfferCatalog",
          name: "Pedicure Services",
        },
        {
          "@type": "OfferCatalog",
          name: "Nail Enhancements",
        },
        {
          "@type": "OfferCatalog",
          name: "Additional Services",
        },
        {
          "@type": "OfferCatalog",
          name: "Waxing Services",
        },
        {
          "@type": "OfferCatalog",
          name: "Kid Services",
        },
      ],
    },
  };

  let structuredData = data;
  if (!structuredData) {
    if (type === "Service") {
      structuredData = defaultService;
    } else {
      structuredData = defaultLocalBusiness;
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
