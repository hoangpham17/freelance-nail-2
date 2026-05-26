import clsx from "clsx";
import React from "react";
type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};
export const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={clsx(
        "max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 xl:px-[60px] w-full overflow-x-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
};
