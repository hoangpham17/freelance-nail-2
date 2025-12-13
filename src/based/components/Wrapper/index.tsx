import clsx from "clsx";
import React from "react";
type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};
export const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div className={clsx("max-w-[1420px] mx-auto", className)}>{children}</div>
  );
};
