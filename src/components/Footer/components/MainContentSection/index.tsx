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
      <Wrapper className="max-w-[1440px] 2xl:max-w-[1680px]">
        <Flex vertical align="center" className="mb-10 md:mb-12">
          <img
            src="/assets/images/logo/desktop.png"
            alt="Madison Nail Lounge"
            className="h-14 w-auto object-contain md:h-[76px]"
          />
        </Flex>

        <div className="madison-footer-info grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <FooterLocationColumn />

          <div className="flex flex-col items-start gap-4 text-left">
            <h4 className="madison-footer-info__heading">Business Hours</h4>
            <div className="flex flex-col items-start gap-2.5 md:gap-3">
              {businessHours.map((row) => (
                <div key={row.label} className="flex items-center gap-3 md:gap-4 justify-start">
                  <span className="madison-footer-info__label w-[85px] md:w-[92px] shrink-0 text-left">
                    {row.label}
                  </span>
                  <span className="madison-footer-info__value whitespace-nowrap text-left">
                    {row.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            <h4 className="madison-footer-info__heading">Keep in Touch</h4>
            <div className="flex flex-col gap-3">
              <Flex align="center" gap={10}>
                <span className="flex w-[20px] shrink-0 justify-center">
                  <SvgIcon
                    src="/assets/svgs/phone.svg"
                    ariaLabel="Phone"
                    width={12}
                    height={18}
                    className="text-madison-gold"
                  />
                </span>
                <a href="tel:6087201011" className="madison-footer-info__value">
                  (608) 720 1011
                </a>
              </Flex>
              <Flex align="center" gap={10}>
                <span className="flex w-[20px] shrink-0 justify-center">
                  <SvgIcon
                    src="/assets/svgs/email.svg"
                    ariaLabel="Email"
                    width={18}
                    height={18}
                    className="text-madison-gold"
                  />
                </span>
                <a
                  href="mailto:contact@madisonnaillounge.com"
                  className="madison-footer-info__value"
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
