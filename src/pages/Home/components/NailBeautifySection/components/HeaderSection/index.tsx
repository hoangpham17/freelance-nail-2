import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../../../routes/Routes";
import { ButtonStyle1 } from "@/based/components/Button/Style1";
import { Flex } from "antd";
import SvgIcon from "@/based/SvgIcon";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";

const HeaderSection: React.FC = () => {
  const { isDesktop, isTablet } = useScreen();
  return (
    <div
      className="relative bg-no-repeat bg-right bg-cover md:bg-contain mb-4 pb-4 lg:pb-0"
      style={{
        backgroundImage: "url('/assets/images/HomePage/bg-nail-beauty.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "right bottom",
      }}
    >
      <div className="md:max-w-[55%] lg:max-w-[640px] lg:pl-10">
        <h2
          className={clsx(
            "font-prata leading-[40px] md:leading-[50px] lg:leading-[100px] mb-2 lg:mb-0",
            responsiveFontSizeArray(36, 70)
          )}
        >
          Your nail beautify {isDesktop || (isTablet && <br />)}
          Elevate your style!
        </h2>
        <p
          className={clsx(
            "font-light max-w-[75%] md:max-w-none",
            responsiveFontSizeArray(12, 20)
          )}
        >
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massae.
        </p>
        <Link to={PATHS.services} className="hidden md:block">
          <ButtonStyle1 className="mt-4 md:mt-6 mb-4">
            <Flex className="gap-4" align="center">
              <span
                className={clsx(
                  "font-lexend font-light",
                  responsiveFontSizeArray(20, 24)
                )}
              >
                View more
              </span>
              <SvgIcon
                src={"/assets/svgs/arrow-right-circle.svg"}
                ariaLabel="text"
                width={32}
                height={32}
                className="size-[32px] shrink-0 text-[#D5AF34]"
              />
            </Flex>
          </ButtonStyle1>
        </Link>
      </div>
    </div>
  );
};

export default HeaderSection;
