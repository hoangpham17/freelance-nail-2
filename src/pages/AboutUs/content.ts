import aboutUsJson from "@/content/aboutUs.json";

export type AboutUsStaticContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    lead: string;
  };
  intro: {
    accent: string;
    description: string;
  };
  closing: {
    quote: string;
  };
};

export const aboutUsContent = aboutUsJson as AboutUsStaticContent;

export const ABOUT_US_HERO_IMAGE = "/assets/images/AboutUs/banner.png";
