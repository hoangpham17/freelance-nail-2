import React from "react";
import { Flex } from "antd";
import { Wrapper } from "@/based/components/Wrapper";
import SvgIcon from "@/based/SvgIcon";
import { footerSocialLinks } from "../../footerSocial";
import FooterLocationColumn from "./FooterLocationColumn";

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
            className="h-14 w-auto object-contain md:h-[76px]"
          />
        </Flex>

        <div className="madison-footer-info grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <FooterLocationColumn />

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

          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            <h4 className="madison-footer-info__heading">Keep in Touch</h4>
            <div className="flex flex-col gap-2">
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
            <div className="flex items-center gap-6 pt-1">
              {footerSocialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  title={item.name}
                  className="inline-flex text-white transition-all duration-300 hover:scale-110 hover:text-madison-gold"
                >
                  <SvgIcon
                    src={item.iconUrl}
                    ariaLabel={item.name}
                    width={24}
                    height={24}
                    className="text-current"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default MainContentSection;
