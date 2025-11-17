import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";
import ServicesTabs from "./components/ServicesTabs";
import ServiceCategorySection from "./components/ServiceCategorySection";
import { ServiceCategory, ServiceItem } from "./types";

const BASE_CATEGORIES: Omit<ServiceCategory, "services">[] = [
  {
    id: "manicure",
    title: "Manicure",
    description:
      "Getting a manicure is a great way to maintain the health and beauty of your nails, as well as to take some time for yourself and indulge in some well-deserved relaxation.",
    backgroundImage: "/assets/images/Services/banner-Manicure.png",
  },
  {
    id: "pedicure",
    title: "Pedicure",
    description:
      "All types of pedicures include the basic steps of removing polish (if applicable), cutting and shaping the nails, caring for the cuticles, using a pumice stone to exfoliate and smooth the feet, providing a massage to promote relaxation and wellness, hot towel and applying regular polish (if desired).",
    backgroundImage: "/assets/images/Services/banner-Pedicure.png",
  },
  {
    id: "nails-enhancements",
    title: "Nail Enhancements",
    description: "",
    backgroundImage: "/assets/images/Services/banner-Nail-Enhancements.png",
  },
  {
    id: "additional-services",
    title: "Additional Services",
    description: "",
    backgroundImage: "/assets/images/Services/banner-Additional-Services.png",
  },
  {
    id: "waxing",
    title: "Waxing",
    description: "",
    backgroundImage: "/assets/images/Services/banner-Waxing.png",
  },
  {
    id: "kid-services",
    title: "Kid's Services",
    description: "",
    backgroundImage: "/assets/images/Services/banner-Kid-Services.png",
  },
];

const Services: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("manicure");
  const { data: servicesData } = useAirtable<ServiceItem>(
    AIRTABLE_ENDPOINTS.services
  );

  const serviceCategories: ServiceCategory[] = useMemo(() => {
    return BASE_CATEGORIES.map((category) => {
      const categoryServices: ServiceItem[] = [];

      servicesData?.forEach((service) => {
        const categoryValue = service.category?.toLowerCase().trim() || "";
        const normalizedId = category.id.toLowerCase();
        const normalizedTitle = category.title.toLowerCase();

        if (
          categoryValue === normalizedId ||
          categoryValue === normalizedTitle ||
          categoryValue === normalizedId.replace("-", " ")
        ) {
          categoryServices.push(service);
        }
      });

      return {
        ...category,
        services: categoryServices,
      };
    });
  }, [servicesData]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace("#", "");
      if (serviceCategories.some((cat) => cat.id === hash)) {
        setActiveTab(hash);
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [location.hash, serviceCategories]);

  return (
    <main className="services-page">
      <ServicesTabs
        categories={serviceCategories.map(({ id, title }) => ({ id, title }))}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

      <section className="services-menu">
        {serviceCategories.map((category) => (
          <ServiceCategorySection key={category.id} category={category} />
        ))}
      </section>
    </main>
  );
};

export default Services;
