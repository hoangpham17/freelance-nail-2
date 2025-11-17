import React, { useEffect, useRef, useState } from "react";
import { WhyChooseItem } from "../../types";
import "./style.css";

interface WhyChooseUsProps {
  items: WhyChooseItem[];
}

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let current = 0;
            const step = Math.max(1, Math.floor(value / 50));
            const interval = window.setInterval(() => {
              current += step;
              if (current >= value) {
                current = value;
                window.clearInterval(interval);
              }
              setDisplayValue(current);
            }, 20);
            observer?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer && observer.disconnect();
    };
  }, [value]);

  return (
    <p
      ref={ref}
      className="why-choose-us__item-number"
      data-animation-number
      data-number-value={value}
    >
      {displayValue}
    </p>
  );
};

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ items }) => {
  return (
    <section className="why-choose-us" data-animation-number-block>
      <div className="container">
        <div className="inner">
          <div className="why-choose-us__content">
            <p className="why-choose-us__title gold">Why Our Client Choose Us ?</p>
            <div className="why-choose-us__list-reason">
              {items.map((item) => (
                <div key={item.label} className="why-choose-us__item-reason">
                  <AnimatedNumber value={item.value} />
                  <p className="why-choose-us__item-text">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
