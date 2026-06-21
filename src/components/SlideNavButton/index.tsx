import clsx from "clsx";

export type SlideNavDirection = "prev" | "next";

export interface SlideNavButtonProps {
  direction: SlideNavDirection;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const DEFAULT_ARIA_LABELS: Record<SlideNavDirection, string> = {
  prev: "Previous slide",
  next: "Next slide",
};

export const SlideNavButton: React.FC<SlideNavButtonProps> = ({
  direction,
  onClick,
  disabled = false,
  className,
  ariaLabel,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel ?? DEFAULT_ARIA_LABELS[direction]}
    className={clsx(
      "flex items-center justify-center w-11 h-11 md:w-[54px] md:h-[54px] rounded-full shrink-0",
      "border border-[#f9be5c]/20 text-[#f9be5c]",
      "bg-[#0a0908]/60 backdrop-blur-md transition-all duration-300",
      "hover:border-[#f9be5c]/60 hover:text-[#ffe5a0] hover:shadow-[0_0_18px_rgba(249,190,92,0.18)]",
      "disabled:opacity-25 disabled:pointer-events-none disabled:hover:border-[#f9be5c]/20 disabled:hover:text-[#f9be5c] disabled:hover:shadow-none",
      className,
    )}
  >
    <svg
      width={9}
      height={15}
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("shrink-0", direction === "prev" && "rotate-180")}
      aria-hidden
    >
      <path
        d="M1.00065 11.6667L6.33398 6.33333L1.00065 1"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default SlideNavButton;
