import React from "react";
import { PATHS } from "@/routes/Routes";
import { Flex } from "antd";
import Link from "antd/es/typography/Link";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import SvgIcon from "@/based/SvgIcon";
import { useScreen } from "@/hooks/useScreen";
import { Wrapper } from "@/based/components/Wrapper";

const SERVICES_MENU = [
  {
    title: "Manicure",
    href: `${PATHS.services}#manicure`,
    icon: "/assets/svgs/manicure.svg",
  },
  {
    title: "Pedicure",
    href: `${PATHS.services}#pedicure`,
    icon: "/assets/svgs/pedicure.svg",
  },
  {
    title: "Nail Enhancements",
    href: `${PATHS.services}#nails-enhancements`,
    icon: "/assets/svgs/nail-enhancements.svg",
  },
  {
    title: "Additional Services",
    href: `${PATHS.services}#additional-services`,
    icon: "/assets/svgs/additional-services.svg",
  },
  {
    title: "Waxing",
    href: `${PATHS.services}#waxing`,
    icon: "/assets/svgs/waxing.svg",
  },
  {
    title: "Kid Service",
    href: `${PATHS.services}#kid-services`,
    icon: "/assets/svgs/kid-service.svg",
  },
  {
    title: "Facial Relax",
    href: `${PATHS.services}#facial-relax`,
    icon: "/assets/svgs/facial-relax.svg",
  },
  {
    title: "HeadSpa",
    href: `${PATHS.services}#headspa`,
    icon: "/assets/svgs/head-spa.svg",
  },
  {
    title: "Eyelash",
    href: `${PATHS.services}#eyelash`,
    icon: "/assets/svgs/eyelash.svg",
  },
];

const WelcomeSection: React.FC = () => {
  const { isMobile } = useScreen();

  const renderTitle = (title: string) => {
    // split first word and last word
    const firstWord = title.split(" ").slice(0, -1).join(" ");
    const lastWord = title.split(" ").slice(-1).join(" ");

    return (
      <Flex
        vertical
        align="center"
        justify="center"
        className={clsx(
          "font-prata tracking-[-2%] text-[#9E7B6A] leading-none",
          responsiveFontSizeArray(20, 24)
        )}
      >
        <span className="inline-block">{firstWord}</span>
        {lastWord && <span className="text-base inline-block">{lastWord}</span>}
      </Flex>
    );
  };

  return (
    <section>
      <div
        className="bg-cover bg-center pt-[150px] text-center z-[1]"
        style={{
          backgroundImage: `url(/assets/images/Background/home-1.jpg)`,
        }}
      >
        <Wrapper>
          <Flex
            vertical
            className="max-w-[895px] mx-auto z-[1] mb-8 text-black"
          >
            <p
              className={clsx(
                "font-prata tracking-[-2%] 2xl:text-[70px]",
                responsiveFontSizeArray(24, 70)
              )}
            >
              Welcome to <br /> The Veira Nail Lounge Spa <br /> and Who we are
              ?
            </p>
            <p className={clsx("mb-0", responsiveFontSizeArray(12, 20))}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massae. Cum sociis natoque
              penatibus et magnis dis parturient montes. Donec quam felis,
              ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat
              massa quis enim.
            </p>
          </Flex>
          <Flex
            className="flex-wrap gap-4 z-[1] translate-y-[60px] md:translate-y-[80px]"
            align="center"
            justify="center"
          >
            {SERVICES_MENU.map((service) => (
              <Link key={service.title} href={service.href}>
                <Flex
                  className="w-32 h-32 md:w-40 md:h-40 bg-white/80 rounded-full"
                  align="center"
                  justify="center"
                  vertical
                  gap={4}
                  style={{
                    backdropFilter: "blur(16px)",
                    boxShadow: "0px 5px 16px 0px #8B4B2026",
                  }}
                >
                  <SvgIcon
                    src={service.icon}
                    ariaLabel="text"
                    width={isMobile ? 40 : 60}
                    height={isMobile ? 40 : 60}
                    className={clsx(
                      "shrink-0 text-[#D1A054]",
                      isMobile ? "size-[40px]" : "size-[60px]"
                    )}
                  />
                  {renderTitle(service.title)}
                </Flex>
              </Link>
            ))}
          </Flex>
        </Wrapper>
      </div>
      <div className="pb-28 bg-white" />
    </section>
  );
};

export default WelcomeSection;
