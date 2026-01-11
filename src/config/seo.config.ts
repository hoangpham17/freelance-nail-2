/**
 * SEO Configuration
 * Centralized SEO settings for the application
 */

export const SEO_CONFIG = {
  siteName: "THE VEIRA NAIL LOUNGE & SPA",
  siteUrl: process.env.VITE_SITE_URL || "https://theveiranailspa.com",
  defaultTitle: "THE VEIRA NAIL LOUNGE & SPA - Premium Nail Care Services",
  defaultDescription:
    "Experience luxury nail care services at THE VEIRA NAIL LOUNGE & SPA. Professional manicures, pedicures, nail enhancements, and spa treatments in Madison, WI.",
  defaultKeywords:
    "nail salon, manicure, pedicure, nail art, Madison WI, spa services, nail enhancements",
  defaultImage: "/assets/images/logo/desktop.png",
  twitterHandle: "@veiranail",
  business: {
    name: "THE VEIRA NAIL LOUNGE & SPA",
    phone: "+1-608-720-1011",
    email: "contact@theveiranailspa.com",
    address: {
      street: "795 University Ave",
      city: "Madison",
      state: "WI",
      zip: "53517",
      country: "US",
    },
    coordinates: {
      latitude: 43.0730802,
      longitude: -89.3986882,
    },
    hours: {
      "Monday-Friday": "9:00am - 7:00pm",
      Saturday: "9:00am - 4:00pm",
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
