import clsx from "clsx";
import React from "react";
type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};
export const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={clsx("max-w-[1504px] mx-auto px-4 md:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
};
