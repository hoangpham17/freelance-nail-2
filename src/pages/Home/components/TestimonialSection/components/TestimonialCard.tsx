import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import SvgIcon from "@/based/SvgIcon";
import { Flex } from "antd";
import { useScreen } from "@/hooks/useScreen";

interface TestimonialCardProps {
  name: string;
  comment: string;
  imageUrl?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  comment,
  imageUrl,
}) => {
  const { isMobile } = useScreen();
  return (
    <div className="px-2 md:px-2 py-4">
      <div className="bg-white rounded-[30px] md:rounded-[40px] p-4 md:p-5 flex flex-col-reverse md:flex-row gap-4 md:gap-5 w-full max-w-[1080px] mx-auto h-auto md:h-[400px] min-[1700px]:h-[540px] transition-[all] duration-500 shadow-testimonial-card relative overflow-hidden">
        {/* White Overlay for inactive slides */}
        <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 pointer-events-none z-20 testimonial-overlay" />

        {/* Left: Beige Text Content - 2/3 width */}
        <div className="bg-[#F7F4F2] rounded-[30px] md:rounded-[40px] p-8 md:py-14 md:px-12 w-full md:w-2/3 flex flex-col relative items-center">
          {/* Quote Icon Top Left */}
          <div className="absolute top-2 left-4 md:top-4 md:left-6">
            <SvgIcon
              src="/assets/svgs/quote-open.svg"
              ariaLabel="quote-open"
              width={isMobile ? 35 : 55}
              height={isMobile ? 26 : 36}
              className="text-[#B2866D]"
            />
          </div>

          <Flex justify="center" vertical className="h-full">
            <h3
              className={clsx(
                "font-playfairDisplay text-[#6B4A2F] font-bold mb-2 md:mb-3",
                responsiveFontSizeArray(20, 32),
              )}
            >
              {name}
            </h3>

            <p
              className={clsx(
                "text-[#4D3A2C]/90 leading-[1.8] font-light italic",
                responsiveFontSizeArray(14, 20),
              )}
            >
              {comment}
            </p>
          </Flex>

          {/* Quote Icon Bottom Right */}
          <div className="absolute bottom-2 right-4 md:bottom-4 md:right-6">
            <SvgIcon
              src="/assets/svgs/quote-close.svg"
              ariaLabel="quote-close"
              width={isMobile ? 35 : 55}
              height={isMobile ? 26 : 36}
              className="text-[#E8D6C9]"
            />
          </div>
        </div>

        {/* Right: Image - 1/3 width */}
        <div className="w-full md:w-1/3 h-[300px] md:h-auto overflow-hidden rounded-[30px] md:rounded-[40px]">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${imageUrl || "/assets/images/HomePage/bg-service.png"})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
