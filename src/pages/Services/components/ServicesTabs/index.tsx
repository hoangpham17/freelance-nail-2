import React from "react";
import "./style.css";

interface ServicesTabsProps {
  categories: { id: string; title: string }[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

const ServicesTabs: React.FC<ServicesTabsProps> = ({
  categories,
  activeTab,
  onTabClick,
}) => {
  return (
    <section className="services-tab" data-tab-block>
      <div className="container">
        <div className="inner">
          <div className="services-tab__list-wrapper">
            <div className="services-tab__list" data-tab-wrapper>
              {categories.map((category) => (
                <a
                  key={category.id}
                  className={`services-tab__item ${
                    activeTab === category.id ? "active" : ""
                  }`}
                  data-tab-services={category.id}
                  href={`#${category.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onTabClick(category.id);
                  }}
                >
                  {category.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;
