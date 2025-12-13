import React from "react";

interface CustomDotsProps {
  totalSlides: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  position?: "bottom" | "top";
  className?: string;
}

const CustomDots: React.FC<CustomDotsProps> = ({
  totalSlides,
  currentIndex,
  onDotClick,
  activeColor = "#D4AF37",
  inactiveColor = "#D3D3D3",
  position = "bottom",
  className = "",
}) => {
  if (totalSlides <= 1) return null;

  const positionClasses =
    position === "bottom"
      ? "absolute bottom-[30px] left-1/2 -translate-x-1/2 z-20"
      : "absolute top-[30px] left-1/2 -translate-x-1/2 z-20";

  return (
    <div className={`${positionClasses} ${className}`}>
      <ul className="flex items-center justify-center gap-[6px] list-none m-0 p-0">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <li key={index} className="m-0 p-0">
              <button
                onClick={() => onDotClick(index)}
                className={`block cursor-pointer transition-all duration-300 ease-in-out ${
                  isActive
                    ? "w-[30px] h-[5px] rounded-[2.5px]"
                    : "w-[5px] h-[5px] rounded-full"
                }`}
                style={{
                  backgroundColor: isActive ? activeColor : inactiveColor,
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomDots;
