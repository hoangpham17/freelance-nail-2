/**
 * SEO Configuration
 * Centralized SEO settings for the application
 */

import { BRAND } from "./brand.config";

export const SEO_CONFIG = {
  siteName: BRAND.nameUppercase,
  siteUrl: BRAND.siteUrl,
  defaultTitle: BRAND.defaultTitle,
  defaultDescription: BRAND.defaultDescription,
  defaultKeywords: BRAND.defaultKeywords,
  defaultImage: "/assets/images/logo/desktop.png",
  twitterHandle: BRAND.twitterHandle,
  business: {
    name: BRAND.nameUppercase,
    phone: BRAND.phone,
    email: BRAND.email,
    address: {
      street: "795 University Ave",
      city: "Madison",
      state: "WI",
      zip: "53715",
      country: "US",
    },
    coordinates: {
      latitude: 43.0730802,
      longitude: -89.3986882,
    },
    hours: {
      "Monday-Friday": "9:30am - 7:30pm",
      Saturday: "9:30am - 5:00pm",
      Sunday: "11:00am - 4:00pm",
    },
    social: {
      facebook: "https://www.facebook.com/madisonnailloungewi",
      instagram: "https://www.instagram.com/madisonnaillounge/",
      google: "https://www.google.com",
      pinterest: "https://www.pinterest.com",
    },
  },
};
