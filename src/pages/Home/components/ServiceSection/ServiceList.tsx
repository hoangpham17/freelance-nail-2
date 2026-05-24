import { useServiceCategories } from "@/hooks/useServiceCategories";
import { PATHS } from "@/routes/Routes";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Flex } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Wrapper } from "@/based/components/Wrapper";
import { ServiceCategory } from "@/pages/Services/types";

const ServiceItem = ({ category }: { category: ServiceCategory }) => {
  const to = `${PATHS.services}#${category.slug}`;
  const iconUrl = category.icon || "/assets/svgs/manicure.svg";

  return (
    <Link
      to={to}
      className="home-service-item group flex flex-1 min-w-[120px] max-w-[200px] flex-col items-center justify-between gap-4 focus-visible:outline-none"
    >
      <div className="home-service-item__icon flex size-[120px] items-center justify-center rounded-xl p-6 md:size-[140px] md:p-8">
        <div
          className="h-14 w-full shrink-0 transition-transform duration-300 group-hover:scale-105 md:h-16"
          style={{
            backgroundColor: "#f9be5c",
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
      </div>
      <span
        className={clsx(
          "home-service-item__label text-center font-semibold text-[#e5e7eb] transition-colors duration-300",
          responsiveFontSizeArray(14, 18),
        )}
      >
        {category.title}
      </span>
    </Link>
  );
};

export const ServiceList = () => {
  const { categories: serviceCategories } = useServiceCategories();

  return (
    <div className="relative z-[1] pb-10 md:pb-16">
      <Wrapper>
        <Flex
          className="flex-wrap justify-center gap-6 md:gap-10 lg:gap-12 pt-2"
          align="flex-start"
        >
          {serviceCategories.map((category) => (
            <ServiceItem key={category.id} category={category} />
          ))}
        </Flex>
      </Wrapper>
    </div>
  );
};
