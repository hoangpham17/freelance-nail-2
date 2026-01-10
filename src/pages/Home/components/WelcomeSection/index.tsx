import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/Routes";
import { Flex } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";
import { useServiceCategories } from "@/hooks/useServiceCategories";

const WelcomeSection: React.FC = () => {
  const { isMobile } = useScreen();
  const { categories: serviceCategories } = useServiceCategories();

  return (
    <section className="-mt-2">
      <Flex
        vertical
        justify="space-around"
        className="pt-[150px] text-center z-[1] min-h-auto md:min-h-[751px]"
        style={{
          backgroundImage: `url(/assets/images/HomePage/bg-welcome.png)`,
          backgroundSize: "100% 100%",
        }}
      >
        <Flex vertical className="max-w-[895px] mx-auto z-[1] mb-8 text-black">
          <p
            className={clsx(
              "font-prata tracking-[-2%] leading-[30px] lg:leading-[70px]",
              responsiveFontSizeArray(24, 70)
            )}
          >
            Welcome to <br /> The Veira Nail Lounge Spa <br /> and Who we are ?
          </p>
          <p
            className={clsx("mb-0 font-light", responsiveFontSizeArray(12, 20))}
          >
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massae. Cum sociis natoque
            penatibus et magnis dis parturient montes. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat
            massa quis enim.
          </p>
        </Flex>
        <Flex className="flex-wrap gap-4 z-[1]" align="center" justify="center">
          {serviceCategories.map((category) => {
            const to = `${PATHS.services}#${category.slug}`;
            const iconUrl = category.icon || "/assets/svgs/manicure.svg"; // Fallback icon

            return (
              <Link key={category.id} to={to}>
                <Flex
                  className="w-32 h-32 lg:w-40 lg:h-40 bg-white/80 rounded-full gap-1 lg:gap-4 hover:translate-y-[-5px] transition-all duration-300"
                  align="center"
                  justify="center"
                  vertical
                  style={{
                    backdropFilter: "blur(16px)",
                    boxShadow: "0px 5px 16px 0px #8B4B2026",
                  }}
                >
                  <img
                    src={iconUrl}
                    alt={category.title}
                    className={clsx(
                      "shrink-0 object-contain",
                      isMobile ? "w-10 h-10" : "w-[60px] h-[60px]"
                    )}
                  />
                  <Flex
                    vertical
                    align="center"
                    justify="center"
                    className={clsx(
                      "font-prata tracking-[-2%] text-[#9E7B6A] leading-none text-lg flex-wrap mb-2"
                    )}
                  >
                    {category.title}
                  </Flex>
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Flex>
      {/* <div className="pb-28 bg-white" /> */}
    </section>
  );
};

export default WelcomeSection;
