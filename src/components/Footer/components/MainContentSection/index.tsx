import React from "react";
import { Flex } from "antd";
import { Wrapper } from "@/based/components/Wrapper";
import { directUrl, googlemapUrl } from "./data";

const businessHours = [
  { label: "Mon - Fri:", time: "9:30 AM - 7:30 PM" },
  { label: "Saturday:", time: "9:30 AM - 5:00 PM" },
  { label: "Sunday:", time: "11:00 AM - 4:00 PM" },
];

const MainContentSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 lg:py-[60px]">
      <Wrapper>
        <Flex vertical align="center" className="mb-10 md:mb-12">
          <img
            src="/assets/images/logo/desktop.png"
            alt="Madison Nail Lounge"
            className="h-14 md:h-[76px] w-auto object-contain"
          />
        </Flex>

        <div className="madison-footer-info grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="madison-footer-info__heading">Keep in Touch</h4>
            <div className="flex flex-col gap-2">
              <Flex align="start" gap={8}>
                <span className="madison-footer-info__label w-[18px] shrink-0">
                  A:
                </span>
                <a
                  href={directUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="madison-footer-info__value"
                >
                  795 University Ave, Madison, WI 53715
                </a>
              </Flex>
              <Flex align="center" gap={8}>
                <span className="madison-footer-info__label w-[18px] shrink-0">
                  T:
                </span>
                <a href="tel:6087201011" className="madison-footer-info__value">
                  (608) 720 1011
                </a>
              </Flex>
              <Flex align="center" gap={8}>
                <span className="madison-footer-info__label w-[18px] shrink-0">
                  E:
                </span>
                <a
                  href="mailto:contact@madisonnaillounge.com"
                  className="madison-footer-info__email"
                >
                  contact@madisonnaillounge.com
                </a>
              </Flex>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="madison-footer-info__heading">Business Hours</h4>
            <div className="flex flex-col gap-2">
              {businessHours.map((row) => (
                <Flex key={row.label} gap={16} wrap="wrap" align="center">
                  <span className="madison-footer-info__label min-w-[92px] shrink-0">
                    {row.label}
                  </span>
                  <span className="madison-footer-info__value">{row.time}</span>
                </Flex>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <a
              href={googlemapUrl}
              target="_blank"
              rel="noreferrer"
              className="block transition-opacity hover:opacity-90"
            >
              <div className="relative w-full aspect-[1288/658] max-h-[220px] lg:max-h-[280px] rounded-xl overflow-hidden bg-madison-surface">
                <img
                  src="/assets/images/Footer/map.jpg"
                  alt="Madison Nail Lounge location"
                  className="w-full h-full object-cover"
                />
              </div>
            </a>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default MainContentSection;
