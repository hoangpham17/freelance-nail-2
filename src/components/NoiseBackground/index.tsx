import React from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const NoiseBackground = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { children, className, ...rest } = props;
    return (
      <div ref={ref} {...rest} className={clsx(className, "relative ")}>
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'url("/assets/images/noise.png")',
            backgroundSize: "1920px",
            opacity: 0.05,
          }}
        />
        {children}
      </div>
    );
  },
);

NoiseBackground.displayName = "NoiseBackground";
