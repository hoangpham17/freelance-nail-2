import clsx from "clsx";

type GalleryNavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const GalleryNavButton: React.FC<GalleryNavButtonProps> = ({
  direction,
  onClick,
  disabled = false,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "prev" ? "Gallery previous" : "Gallery next"}
    className={clsx(
      "flex items-center justify-center size-[42px] rounded-full border border-madison-gold/70 text-madison-gold transition-colors shrink-0",
      "hover:bg-madison-gold/10 disabled:opacity-35 disabled:pointer-events-none disabled:hover:bg-transparent",
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

export default GalleryNavButton;
