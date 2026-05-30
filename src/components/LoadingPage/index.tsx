import React from "react";
import clsx from "clsx";
import "./style.css";

interface LoadingPageProps {
  /** Optional custom className */
  className?: string;
  /** Optional z-index (default: 9999) */
  zIndex?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  className,
  zIndex = 9999,
}) => {
  return (
    <div
      className={clsx(
        "loading-page fixed inset-0 flex items-center justify-center",
        "bg-black/40 backdrop-blur-sm",
        className
      )}
      style={{ zIndex }}
      role="status"
      aria-label="Loading"
    >
      <span className="loader" aria-hidden="true" />
    </div>
  );
};

export default LoadingPage;
