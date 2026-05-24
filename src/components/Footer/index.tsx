import React from "react";
import MainContentSection from "./components/MainContentSection";
import SvgIcon from "@/based/SvgIcon";
import { Wrapper } from "@/based/components/Wrapper";

const listSocial = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/madisonnaillounge/",
    iconUrl: "/assets/svgs/instagram.svg",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/madisonnailloungewi",
    iconUrl: "/assets/svgs/fb.svg",
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black relative z-10 overflow-hidden">
      <MainContentSection />

      <div className="border-t border-madison-border">
        <Wrapper>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 text-madison-muted font-montserrat text-body-l">
          <p className="text-center sm:text-left">
            Copyright {currentYear} Madison Nail Lounge — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            {listSocial.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                title={item.name}
                className="text-madison-gold hover:text-madison-gold-dark transition-colors"
              >
                <SvgIcon
                  src={item.iconUrl}
                  ariaLabel={item.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </footer>
  );
};

export default Footer;
