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
      <div className="testimonial-card bg-madison-surface rounded-[1rem] sm:rounded-[1.125rem] lg:rounded-[1.25rem] p-4 md:p-6 flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full max-w-[1080px] mx-auto h-auto md:h-[400px] min-[1700px]:h-[540px] transition-[box-shadow] duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 pointer-events-none z-20 testimonial-overlay" />

        <div className="bg-black rounded-[1rem] sm:rounded-[1.125rem] lg:rounded-[1.25rem] p-6 md:py-10 md:px-8 w-full md:w-[55%] flex flex-col relative justify-between min-h-[200px]">
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <SvgIcon
              src="/assets/svgs/quote-open.svg"
              ariaLabel="quote-open"
              width={isMobile ? 28 : 55}
              height={isMobile ? 20 : 36}
              className="text-madison-gold"
            />
          </div>

          <Flex justify="center" vertical className="h-full pt-8 md:pt-10">
            <h3
              className={clsx(
                "text-gold-gradient-name font-tangerine mb-3 md:mb-4",
                responsiveFontSizeArray(18, 32),
              )}
            >
              {name}
            </h3>

            <p
              className={clsx(
                "text-madison-muted font-montserrat font-medium leading-relaxed",
                responsiveFontSizeArray(12, 18),
              )}
            >
              {comment}
            </p>
          </Flex>

          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
            <SvgIcon
              src="/assets/svgs/quote-close.svg"
              ariaLabel="quote-close"
              width={isMobile ? 28 : 37}
              height={isMobile ? 20 : 24}
              className="text-madison-gold/60"
            />
          </div>
        </div>

        <div className="w-full md:flex-1 h-[260px] md:h-auto overflow-hidden rounded-[1rem] sm:rounded-[1.125rem] lg:rounded-[1.25rem]">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
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
