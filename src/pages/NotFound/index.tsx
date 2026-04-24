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
import notFoundContent from "@/content/notFound.json";

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
                "font-sora text-[#9E7B6A] leading-none",
                responsiveFontSizeArray(120, 200),
              )}
            >
              {(notFoundContent as { code: string }).code}
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8 lg:mb-12">
            <h2
              className={clsx(
                "font-sora text-[#10182A] mb-4",
                responsiveFontSizeArray(32, 60),
              )}
            >
              {(notFoundContent as { title: string }).title}
            </h2>
            <p
              className={clsx(
                "font-light text-[#494747] max-w-lg mx-auto",
                responsiveFontSizeArray(16, 20),
              )}
            >
              {(notFoundContent as { description: string }).description}
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
              <ButtonStyle1>
                <Flex className="gap-4" align="center">
                  <span
                    className={clsx(
                      "font-light",
                      responsiveFontSizeArray(16, 20),
                    )}
                  >
                    {
                      (notFoundContent as { actions: { goHome: string } })
                        .actions.goHome
                    }
                  </span>
                </Flex>
              </ButtonStyle1>
            </Link>

            <Link to={PATHS.services}>
              <ButtonStyle1>
                <Flex className="gap-4" align="center">
                  <span
                    className={clsx(
                      "font-light",
                      responsiveFontSizeArray(16, 20),
                    )}
                  >
                    {
                      (notFoundContent as { actions: { viewServices: string } })
                        .actions.viewServices
                    }
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
                responsiveFontSizeArray(14, 18),
              )}
            >
              {(notFoundContent as { linksIntro: string }).linksIntro}
            </p>
            <Flex
              vertical={!isDesktop}
              gap={12}
              justify="center"
              align="center"
              className="flex-wrap"
            >
              <Link
                to={PATHS.hostAParty}
                className={clsx(
                  "text-[#9E7B6A] hover:text-[#C19A6B] transition-colors underline",
                  responsiveFontSizeArray(14, 16),
                )}
              >
                {
                  (notFoundContent as { links: { hostAParty: string } }).links
                    .hostAParty
                }
              </Link>
              <div className="w-1 h-1 bg-[#9E7B6A] rounded-full" />
              <Link
                to={PATHS.aboutUs}
                className={clsx(
                  "text-[#9E7B6A] hover:text-[#C19A6B] transition-colors underline",
                  responsiveFontSizeArray(14, 16),
                )}
              >
                {
                  (notFoundContent as { links: { aboutUs: string } }).links
                    .aboutUs
                }
              </Link>
              <div className="w-1 h-1 bg-[#9E7B6A] rounded-full" />
              <Link
                to={PATHS.gallery}
                className={clsx(
                  "text-[#9E7B6A] hover:text-[#C19A6B] transition-colors underline",
                  responsiveFontSizeArray(14, 16),
                )}
              >
                {
                  (notFoundContent as { links: { gallery: string } }).links
                    .gallery
                }
              </Link>
              <div className="w-1 h-1 bg-[#9E7B6A] rounded-full" />
              <Link
                to={PATHS.contactUs}
                className={clsx(
                  "text-[#9E7B6A] hover:text-[#C19A6B] transition-colors underline",
                  responsiveFontSizeArray(14, 16),
                )}
              >
                {
                  (notFoundContent as { links: { contactUs: string } }).links
                    .contactUs
                }
              </Link>
            </Flex>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default NotFound;
