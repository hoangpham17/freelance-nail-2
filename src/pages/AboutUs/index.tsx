import React from "react";
import Banner from "./components/Banner";
import AboutUsSection from "./components/AboutUsSection";
import { AboutUsCardData } from "./types";

const HARDCODED_ABOUT_US_DATA: AboutUsCardData[] = [
  {
    id: "hardcoded-1",
    description:
      "Our team of experienced technicians is devoted to delivering the highest quality treatments, utilizing the finest products and equipment available.",
    icon: "/assets/images/Icons/icon-about-us-1.svg",
    logo: "/assets/images/Icons/icon-about-us-our-yellow.svg",
    backgroundColor: "rgba(255, 238, 214, 0.8)",
  },
  {
    id: "hardcoded-2",
    description:
      "Our highly skilled technicians have undergone advanced training and consistently stay up to date with the latest trends and techniques in nail care. Whether you are seeking a simple, classic manicure or an intricate nail design, our technicians will skillfully try to bring your vision to life.",
    icon: "/assets/images/Icons/icon-about-us-2.svg",
    logo: "/assets/images/Icons/icon-about-us-our-blue.svg",
    backgroundColor: "rgba(243, 249, 255, 0.8)",
  },
  {
    id: "hardcoded-3",
    description:
      "We are more than just a nail salon. We are an exceptional oasis of beauty, relaxation, and top-notch service. Our mission is to provide our valued clients with an outstanding service that leaves them feeling pampered, rejuvenated, and confident.",
    icon: "/assets/images/Icons/icon-about-us-3.svg",
    logo: "/assets/images/Icons/icon-about-us-we.svg",
    backgroundColor: "rgba(247, 247, 247, 1)",
  },
];

const AboutUs: React.FC = () => {
  return (
    <main className="about-us-page">
      <Banner
        title="About us"
        description="Welcome to Madison Nail Lounge, where luxurious nail care services and exceptional customer services are our top priorities."
        backgroundImage="/assets/images/Background/banner-about-us.jpg"
      />
      <AboutUsSection items={HARDCODED_ABOUT_US_DATA} />
    </main>
  );
};

export default AboutUs;
