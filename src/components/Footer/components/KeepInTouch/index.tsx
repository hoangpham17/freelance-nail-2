import React from "react";
import { Title } from "../Title";
import SvgIcon from "@/based/SvgIcon";
import { Flex } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const KeepInTouch: React.FC = () => {
  const socialLinks = [
    {
      href: "https://www.google.com",
      icon: "bi-google",
      label: "Google",
    },
    {
      href: "https://www.linkedin.com",
      icon: "bi-linkedin",
      label: "LinkedIn",
    },
    {
      href: "https://www.facebook.com/madisonnailloungewi",
      icon: "bi-facebook",
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/madisonnaillounge/",
      icon: "bi-instagram",
      label: "Instagram",
    },
    {
      href: "https://www.pinterest.com",
      icon: "bi-pinterest",
      label: "Pinterest",
    },
  ];

  return (
    <div className="flex flex-col md:col-span-2 lg:col-span-1">
      <Title>KEEP IN TOUCH</Title>
      <Flex vertical gap={6}>
        <a
          href="tel:6087201011"
          className="text-2xl transition-colors hover:opacity-80"
          style={{ color: "#494747" }}
        >
          <Flex className="gap-5" align="center">
            <SvgIcon
              src={"/assets/svgs/phone.svg"}
              ariaLabel="text"
              width={24}
              height={24}
              className="size-[24px] shrink-0"
            />
            <span>(608) 720 1011</span>
          </Flex>
        </a>
        <a
          href="mailto:naillounge@mail.com"
          className={clsx(
            "transition-colors hover:opacity-80 !text-[#494747]",
            responsiveFontSizeArray(12, 20)
          )}
        >
          naillounge@mail.com
        </a>
        <div className="flex gap-3 md:gap-4 mt-2">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-black !text-[#D5B994] hover:opacity-80"
              aria-label={social.label}
            >
              <i className={`bi ${social.icon} text-base md:text-lg`}></i>
            </a>
          ))}
        </div>
      </Flex>
    </div>
  );
};

export default KeepInTouch;
