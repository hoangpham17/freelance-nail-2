import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";
import ContactForm from "./components/ContactForm";

const ContactUs: React.FC = () => {
  const { isDesktop } = useScreen();

  return (
    <div className="relative w-full bg-white">
      <Wrapper className="relative pt-12 lg:pt-20 pb-10 lg:pb-24">
        <div className="z-10 max-w-6xl mx-auto">
          <div className="mb-12 lg:mb-16">
            <div className="relative">
              <div className="absolute -right-[20%] lg:-right-16 -top-3 lg:top-0 w-[160px] h-[160px] lg:w-[263px] lg:h-[263px] pointer-events-none z-0">
                <img
                  src="/assets/images/Contact-Us/circle-image.png"
                  alt="Let's connect"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <h1
                className={clsx(
                  "font-prata text-[#10182A] mb-4 max-w-[90%]",
                  responsiveFontSizeArray(21, 65)
                )}
              >
                Unlock the secrets of captivating beauty with our luxurious
                <span
                  className={clsx(
                    "font-prata text-[#D1A054] block",
                    responsiveFontSizeArray(35, 120)
                  )}
                >
                  We'll contact you
                </span>
              </h1>
            </div>
          </div>

          {isDesktop ? (
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="col-span-4 relative">
                <img
                  src="/assets/images/Contact-Us/left-image.png"
                  alt="Decorative element"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="col-span-8">
                <ContactForm />
              </div>
            </div>
          ) : (
            <div
              className="relative rounded-2xl pt-[42px] lg:pt-0"
              style={{
                backgroundImage: `url(/assets/images/Contact-Us/left-image-mobile.png)`,
                backgroundSize: "contain",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 bg-white/80 lg:mt-0">
                <ContactForm />
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default ContactUs;
