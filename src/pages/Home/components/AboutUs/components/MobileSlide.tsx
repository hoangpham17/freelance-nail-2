import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Flex, Skeleton } from "antd";
import clsx from "clsx";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { NavigationArrows } from "@/components/NavigationArrows";

interface AboutUsItem {
  imageUrl?: string;
  note?: string;
}

interface MobileSlideProps {
  items: AboutUsItem[];
  isLoading?: boolean;
}

const MobileSlide: React.FC<MobileSlideProps> = ({ items, isLoading = false }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton.Image active className="!w-full !h-[220px] rounded-2xl" />
            <Skeleton active paragraph={{ rows: 2 }} title={false} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        loop={items.length > 1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="about-us-mobile-swiper"
      >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <Flex vertical className="w-full gap-6">
            {/* Image */}
            <div className="w-full h-[220px] rounded-2xl shadow-sm overflow-hidden group/img bg-[#F5F5F5]">
              {item.imageUrl ? (
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover/img:scale-105"
                  style={{
                    backgroundImage: `url('${item.imageUrl}')`,
                  }}
                />
              ) : (
                <Skeleton.Image active className="!w-full !h-full" />
              )}
            </div>

            {/* Note */}
            {item.note && (
              <div
                dangerouslySetInnerHTML={{
                  __html: parseAirtableRichtext(item.note),
                }}
                className={clsx(
                  "text-[#8A6A4F] font-extralight text-center",
                  responsiveFontSizeArray(14, 18),
                )}
              />
            )}
          </Flex>
        </SwiperSlide>
      ))}
      </Swiper>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -left-6 -right-6 -translate-y-2/3 z-50 pointer-events-none">
        <NavigationArrows
          onPrev={() => swiperRef.current?.slidePrev()}
          onNext={() => swiperRef.current?.slideNext()}
          className="flex justify-between w-full mb-0"
          buttonClassName="bg-white/70 backdrop-blur-md shadow-lg pointer-events-auto w-12 h-12 md:w-16 md:h-16"
        />
      </div>
    </div>
  );
};

export default MobileSlide;

