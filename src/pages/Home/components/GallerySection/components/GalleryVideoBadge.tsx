import React from "react";
import clsx from "clsx";

type GalleryVideoBadgeProps = {
  className?: string;
};

const GalleryVideoBadge: React.FC<GalleryVideoBadgeProps> = ({ className }) => (
  <span
    className={clsx(
      "pointer-events-none absolute top-2 right-2 z-[1] flex size-7 items-center justify-center rounded-full bg-black/50 text-white shadow-sm backdrop-blur-sm md:top-2.5 md:right-2.5 md:size-8",
      className,
    )}
    aria-hidden
  >
    <svg
      viewBox="0 0 24 24"
      className="size-3.5 md:size-4"
      fill="currentColor"
    >
      <path d="M8 6v12l12-6-12-6z" />
    </svg>
  </span>
);

export default GalleryVideoBadge;
