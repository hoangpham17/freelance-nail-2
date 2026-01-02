import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/Routes";
import { Wrapper } from "@/based/components/Wrapper";
import { ButtonStyle1 } from "@/based/components/Button/Style1";
import { Flex } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";
import { useBaseOffset } from "@/hooks/useBaseOffset";

const NotFound: React.FC = () => {
  const { isDesktop } = useScreen();
  const { mainTopSpacing } = useBaseOffset();

  return (
    <main
      className="w-full min-h-screen bg-white flex items-center justify-center"
      style={{ paddingTop: `${mainTopSpacing}px` }}
    >
      <Wrapper className="py-12 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-6 lg:mb-8">
            <h1
              className={clsx(
                "font-prata text-[#9E7B6A] leading-none",
                responsiveFontSizeArray(120, 200)
              )}
            >
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8 lg:mb-12">
            <h2
              className={clsx(
                "font-prata text-[#10182A] mb-4",
                responsiveFontSizeArray(32, 60)
              )}
            >
              Page Not Found
            </h2>
            <p
              className={clsx(
                "font-light text-[#494747] max-w-lg mx-auto",
                responsiveFontSizeArray(16, 20)
              )}
            >
              Oops! The page you're looking for doesn't exist. It might have
              been moved, deleted, or the URL might be incorrect.
            </p>
          </div>

          {/* Action Buttons */}
          <Flex
            vertical={!isDesktop}
            gap={16}
            justify="center"
            align="center"
            className="flex-wrap"
          >
            <Link to={PATHS.home}>
              <ButtonStyle1 className="font-lexend">
                <Flex className="gap-4" align="center">
                  <span
                    className={clsx(
                      "font-lexend font-light",
                      responsiveFontSizeArray(16, 20)
                    )}
                  >
                    Go to Homepage
                  </span>
                </Flex>
              </ButtonStyle1>
            </Link>

            <Link to={PATHS.services}>
              <ButtonStyle1 className="font-lexend">
                <Flex className="gap-4" align="center">
                  <span
                    className={clsx(
                      "font-lexend font-light",
                      responsiveFontSizeArray(16, 20)
                    )}
                  >
                    View Our Services
                  </span>
                </Flex>
              </ButtonStyle1>
            </Link>
          </Flex>

          {/* Additional Links */}
          <div className="mt-12 lg:mt-16">
            <p
              className={clsx(
                "font-light text-[#494747] mb-4",
                responsiveFontSizeArray(14, 18)
              )}
            >
              Or visit one of these pages:
            </p>
            <Flex
              vertical={!isDesktop}
              gap={12}
              justify="center"
              align="center"
              className="flex-wrap"
            >
              <Link
                to={PATHS.aboutUs}
                className={clsx(
                  "text-[#9E7B6A] hover:text-[#C19A6B] transition-colors underline",
                  responsiveFontSizeArray(14, 16)
                )}
              >
                About Us
              </Link>
              <Link
                to={PATHS.gallery}
                className={clsx(
                  "text-[#9E7B6A] hover:text-[#C19A6B] transition-colors underline",
                  responsiveFontSizeArray(14, 16)
                )}
              >
                Gallery
              </Link>
              <Link
                to={PATHS.contactUs}
                className={clsx(
                  "text-[#9E7B6A] hover:text-[#C19A6B] transition-colors underline",
                  responsiveFontSizeArray(14, 16)
                )}
              >
                Contact Us
              </Link>
            </Flex>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default NotFound;
