import { useServiceCategories } from "@/hooks/useServiceCategories";
import { PATHS } from "@/routes/Routes";
import { Link } from "react-router-dom";
import { Wrapper } from "@/based/components/Wrapper";
import { ServiceCategory } from "@/pages/Services/types";

const ServiceItem = ({ category }: { category: ServiceCategory }) => {
  const to = `${PATHS.services}#${category.slug}`;
  const iconUrl = category.icon || "/assets/svgs/manicure.svg";

  return (
    <Link
      to={to}
      className="home-service-item group flex min-w-0 focus-visible:outline-none"
    >
      <div className="home-service-item__icon-wrap aspect-square w-full">
        <span
          className="home-service-item__border home-service-item__border--tr"
          aria-hidden
        />
        <span
          className="home-service-item__border home-service-item__border--bl"
          aria-hidden
        />
        <div className="home-service-item__icon size-full">
          <div className="home-service-item__icon-slot">
            <div
              className="home-service-item__icon-graphic transition-transform duration-300 group-hover:scale-[1.04]"
              style={{
                backgroundColor: "var(--madison-gold)",
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
          <span className="home-service-item__label font-tangerine text-gold-gradient">
            {category.title}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const ServiceList = () => {
  const { categories: serviceCategories } = useServiceCategories();

  if (serviceCategories.length === 0) return null;

  return (
    <div className="relative z-[1] pb-16 md:pb-20 lg:pb-24">
      <Wrapper>
        <div
          className="home-service-list mx-auto w-full max-w-[1400px] pt-2"
          data-home-service-list
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
