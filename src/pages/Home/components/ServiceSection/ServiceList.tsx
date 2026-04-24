import React from "react";
import { NoiseBackground } from "@/components/NoiseBackground";
import { useScreen } from "@/hooks/useScreen";
import { useServiceCategories } from "@/hooks/useServiceCategories";
import { PATHS } from "@/routes/Routes";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Flex } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import SvgIcon from "@/based/SvgIcon";
import { Wrapper } from "@/based/components/Wrapper";
import { ServiceCategory } from "@/pages/Services/types";

const ServiceItem = ({ category }: { category: ServiceCategory }) => {
  const { isMobile } = useScreen();
  const [isHovered, setIsHovered] = React.useState(false);
  const to = `${PATHS.services}#${category.slug}`;
  const iconUrl = category.icon || "/assets/svgs/manicure.svg";

  return (
    <Link
      to={to}
      className={clsx(
        "group transition-all duration-300",
        isHovered && "animate-floating",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulse Ripple Effect */}
      {/* {isHovered && (
        <div className="absolute inset-0 rounded-full bg-[#E8D6C9] animate-pulse-ripple -z-10" />
      )} */}
      <div
        className="rounded-full p-[1px] hover:cursor-pointer"
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), linear-gradient(180deg, rgba(255, 255, 255, 0) 13.12%, rgba(255, 255, 255, 0.6) 85.29%)",
        }}
      >
        <Flex
          className={clsx(
            "w-[140px] h-[196px] lg:w-[196px] lg:h-[280px] rounded-full gap-3 lg:gap-6 relative transition-all duration-300 backdrop-blur-sm",
          )}
          align="center"
          justify="center"
          vertical
          style={{
            background: isHovered
              ? "linear-gradient(0deg, rgba(202, 159, 64, 0.15), rgba(202, 159, 64, 0.15)), radial-gradient(76.25% 76.25% at 22.5% 10%, rgba(255, 255, 255, 0.3) 0%, rgba(202, 159, 64, 0) 100%)"
              : "#FFFFFF73",
            backdropFilter: "blur(4px)",
            boxShadow: isHovered
              ? "0px 0px 25px 0px rgba(232, 214, 201, 0.6), 0px 5px 6px 0px #6B4A2F33 inset, 0px 4px 20px 0px rgba(107, 74, 47, 0.15)"
              : "0px 5px 6px 0px #6B4A2F33 inset, 0px 4px 20px 0px rgba(107, 74, 47, 0.15)",
          }}
        >
          <div
            className={clsx(
              "shrink-0 transition-all duration-300 group-hover:scale-110",
              isMobile ? "h-12 w-full" : "h-[72px] w-full",
            )}
            style={{
              backgroundColor: isHovered ? "#6B4A2F" : "#8A6A4F",
              maskImage: `url(${iconUrl})`,
              WebkitMaskImage: `url(${iconUrl})`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
          <div
            className={clsx(
              "font-playfairDisplay font-semibold text-[#6B4A2F] leading-tight text-center max-w-[85%]",
              responsiveFontSizeArray(16, 20),
            )}
          >
            {category.title}
          </div>
        </Flex>
      </div>
    </Link>
  );
};

export const ServiceList = () => {
  const { isMobile } = useScreen();
  const { categories: serviceCategories } = useServiceCategories();

  return (
    <NoiseBackground className="bg-[#f1e0d159] z-[1]">
      <Flex
        className="relative py-4 md:py-8 z-[1] max-w-[1500px] mx-auto"
        align="center"
        justify="center"
      >
        <SvgIcon
          src={"/assets/svgs/star.svg"}
          ariaLabel="text"
          width={isMobile ? 31 : 41}
          height={isMobile ? 26 : 36}
          className="shrink-0 text-[#B2866D] absolute md:-top-[18px] -top-[12px] md:right-10 right-6"
        />
        <Wrapper>
          <Flex
            className="flex-wrap gap-4 md:gap-8 lg:gap-[72px] py-4 md:py-8"
            align="center"
            justify="center"
          >
            {serviceCategories.map((category) => (
              <ServiceItem key={category.id} category={category} />
            ))}
          </Flex>
        </Wrapper>
      </Flex>
    </NoiseBackground>
  );
};
