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
      <div className="loader" aria-hidden="true">
        <span className="loader__aura" />
        <span className="loader__swirl" />
        <span className="loader__ring" />
        <span className="loader__beads">
          <span className="loader__bead" />
          <span className="loader__bead" />
          <span className="loader__bead" />
        </span>
        <span className="loader__pearl" />
      </div>
    </div>
  );
};

export default LoadingPage;
