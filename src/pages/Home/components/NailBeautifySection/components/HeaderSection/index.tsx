import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../../../routes/Routes";
import { ButtonStyle1 } from "@/based/components/Button/Style1";
import { Flex } from "antd";
import SvgIcon from "@/based/SvgIcon";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const HeaderSection: React.FC = () => {
  return (
    <div
      className="relative bg-no-repeat bg-right bg-contain mb-4 md:mb-0"
      style={{
        backgroundImage: "url('/assets/images/Background/home-1.jpg')",
      }}
    >
      <div className="md:max-w-[640px]">
        <h2 className={clsx("font-prata", responsiveFontSizeArray(36, 70))}>
          Your nail beautify
          <br />
          Elevate your style!
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massae.
        </p>
        <Link to={PATHS.services}>
          <ButtonStyle1 className="mt-4 md:mt-6">
            <Flex className="gap-2" align="center">
              <span className={clsx(responsiveFontSizeArray(20, 24))}>
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
