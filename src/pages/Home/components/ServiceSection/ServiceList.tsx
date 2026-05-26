import { useServiceCategories } from "@/hooks/useServiceCategories";
import { PATHS } from "@/routes/Routes";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
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
      className={clsx(
        "home-service-item group flex min-w-0 flex-col items-center justify-between gap-3 md:gap-4 focus-visible:outline-none",
        "w-[calc((100%-2*1rem)/3)] sm:w-[calc((100%-3*1.5rem)/4)] lg:w-[calc((100%-5*2.5rem)/6)]",
        "max-w-[200px]",
      )}
    >
      <div className="home-service-item__icon-wrap size-[100px] sm:size-[110px] md:size-[120px] lg:size-[140px]">
        <span
          className="home-service-item__border home-service-item__border--tr"
          aria-hidden
        />
        <span
          className="home-service-item__border home-service-item__border--bl"
          aria-hidden
        />
        <div className="home-service-item__icon flex size-full items-center justify-center p-6 md:p-8">
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

  if (serviceCategories.length === 0) return null;

  return (
    <div className="relative z-[1] pb-10 md:pb-16">
      <Wrapper>
        <div
          className="flex flex-wrap justify-center items-start gap-4 sm:gap-6 lg:gap-10 pt-2 w-full max-w-[1200px] mx-auto"
          role="list"
        >
          {serviceCategories.map((category) => (
            <ServiceItem key={category.id} category={category} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};
