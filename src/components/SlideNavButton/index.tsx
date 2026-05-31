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
      "flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#f9be5c] text-[#f9be5c] shrink-0",
      "bg-[#252525]/80 backdrop-blur-md shadow-lg transition-all duration-300",
      "hover:bg-[#f9be5c] hover:text-[#984121]",
      "disabled:opacity-35 disabled:pointer-events-none disabled:hover:bg-[#252525]/80 disabled:hover:text-[#f9be5c]",
      className,
    )}
  >
    <svg
      width={8}
      height={13}
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("shrink-0", direction === "prev" && "rotate-180")}
      aria-hidden
    >
      <path
        d="M1.00065 11.6667L6.33398 6.33333L1.00065 1"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default SlideNavButton;
