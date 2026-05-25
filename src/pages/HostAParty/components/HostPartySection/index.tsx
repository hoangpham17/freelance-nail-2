import React from "react";
import clsx from "clsx";
import { Wrapper } from "@/based/components/Wrapper";

type HostPartySectionProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
} & React.ComponentPropsWithoutRef<"section">;

export const HostPartySection = React.forwardRef<HTMLElement, HostPartySectionProps>(
  ({ children, className, innerClassName, ...props }, ref) => (
    <section
      ref={ref}
      className={clsx("host-party-section w-full", className)}
      {...props}
    >
      <Wrapper>
        <div className={clsx("host-party-shell mx-auto w-full", innerClassName)}>
          {children}
        </div>
      </Wrapper>
    </section>
  ),
);

HostPartySection.displayName = "HostPartySection";

export default HostPartySection;
