import React from "react";
import { Helmet } from "react-helmet-async";
import { BRAND } from "@/config/brand.config";
import { SEO_CONFIG } from "@/config/seo.config";

interface StructuredDataProps {
  type?: "LocalBusiness" | "Organization" | "Service";
  data?: Record<string, unknown>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const defaultLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: BRAND.nameUppercase,
    alternateName: [
      BRAND.name,
      "Madison Nail Lounge Madison WI",
      "Madison nail salon",
      "Madison WI nail lounge",
    ],
    image:
      typeof window !== "undefined"
        ? `${window.location.origin}/assets/images/logo/desktop.png`
        : "",
    "@id": typeof window !== "undefined" ? window.location.origin : "",
    url: typeof window !== "undefined" ? window.location.origin : "",
    telephone: SEO_CONFIG.business.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SEO_CONFIG.business.address.street,
      addressLocality: SEO_CONFIG.business.address.city,
      addressRegion: SEO_CONFIG.business.address.state,
      postalCode: SEO_CONFIG.business.address.zip,
      addressCountry: SEO_CONFIG.business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SEO_CONFIG.business.coordinates.latitude,
      longitude: SEO_CONFIG.business.coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:30",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      SEO_CONFIG.business.social.facebook,
      SEO_CONFIG.business.social.instagram,
    ],
  };

  const defaultService = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Nail Care Services",
    provider: {
      "@type": "NailSalon",
      name: BRAND.nameUppercase,
      address: {
        "@type": "PostalAddress",
        streetAddress: SEO_CONFIG.business.address.street,
        addressLocality: SEO_CONFIG.business.address.city,
        addressRegion: SEO_CONFIG.business.address.state,
        postalCode: SEO_CONFIG.business.address.zip,
        addressCountry: SEO_CONFIG.business.address.country,
      },
      telephone: SEO_CONFIG.business.phone,
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
          name: "Nail Art",
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
