import React, { useMemo } from "react";
import { Flex } from "antd";
import { Wrapper } from "@/based/components/Wrapper";
import { NoiseBackground } from "@/components/NoiseBackground";
import { Background } from "./Background";
import { directUrl, googlemapUrl } from "./data";
import SvgIcon from "@/based/SvgIcon";
import { useScreen } from "@/hooks/useScreen";

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

const MainContentSection: React.FC = () => {
  const { isDesktop } = useScreen();

  const iconSize = useMemo(() => (isDesktop ? 16 : 14), [isDesktop]);

  return (
    <NoiseBackground className="bg-[#805D3D] py-4 md:py-8 relative z-[1] overflow-hidden">
     <Background />
      <Wrapper>
        <Flex className="flex-col md:flex-row justify-between flex-wrap gap-6 md:gap-8 lg:gap-[30px] relative z-[1]">
          {/* Logo Column */}
          <Flex className="mb-4 md:mb-0 justify-center" align="center">
            <img
              src="/assets/images/logo/desktop.png"
              alt="The Veira Nail Lounge & Spa"
              className="h-[50px] md:h-[60px] lg:h-[70px] 2xl:h-[80px] w-auto object-contain"
            />
          </Flex>

          {/* Contact Column */}
          <div>
            <h4 className="text-[#E6D7CB] text-[12px] md:text-[13px] tracking-[0.15em] mb-4 md:mb-6 uppercase font-semibold">
              CONTACT US
            </h4>
            <div className="flex flex-col gap-2 text-white text-[14px] md:text-base">
              <a
                href="tel:6087201011"
                className="!text-white underline underline-offset-4 transition-opacity hover:opacity-80"
              >
                (608) 720 1011
              </a>
              <a
                href="mailto:contact@theveiranailspa.com"
                className="!text-white underline underline-offset-4 transition-opacity hover:opacity-80"
              >
                contact@theveiranailspa.com
              </a>
              <Flex className="gap-[6px] lg:gap-2 mt-4">
                {listSocial.map((item) => (
                  <a
                    key={item.name}
                    title={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center bg-white w-7 h-7 rounded-full hover:bg-[#F6EFE9] transition-colors"
                  >
                    <SvgIcon
                      src={item.iconUrl}
                      ariaLabel={item.name}
                      width={iconSize}
                      height={iconSize}
                      className="shrink-0 text-[#8D6444]"
                    />
                  </a>
                ))}
              </Flex>
            </div>
          </div>
<Flex className="flex-col xl:flex-row justify-between flex-wrap gap-6 md:gap-8 lg:gap-[30px] relative z-[1]">
          {/* Location Column */}
          <div className="w-full md:w-auto md:flex-shrink-0">
            <h4 className="text-[#E6D7CB] text-[12px] md:text-[13px] font-semibold tracking-[0.15em] mb-4 md:mb-6 uppercase">
              OUR LOCATION
            </h4>
            <div className="flex flex-col gap-2 text-[14px] md:text-base">
              <a
                href={directUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-80 !text-white"
              >
                <Flex align="start" gap={8}>
                  <i className="bi bi-geo-alt-fill text-[18px] opacity-90"></i>
                  <span className="leading-relaxed max-w-[240px]">
                    795 University Ave, Madison, WI 53715
                  </span>
                </Flex>
              </a>
            </div>
          </div>

          {/* Map Column */}
          <div className="w-full md:w-auto max-w-full md:max-w-none">
            <a
              href={googlemapUrl}
              target="_blank"
              rel="noreferrer"
              className="block transition-opacity hover:opacity-90"
            >
              <div className="relative w-full h-[120px] md:h-[150px] rounded-[16px] md:rounded-[20px] overflow-hidden bg-[#E6CEC0] cursor-pointer">
                <img
                  src="/assets/images/Footer/map.jpg"
                  alt="Map Location"
                  className="w-full h-full opacity-90"
                />
              </div>
            </a>
          </div>
        </Flex>
</Flex>
      </Wrapper>
    </NoiseBackground>
  );
};

export default MainContentSection;

