import { responsiveFontSizeArray } from "@/shared/utils/helper";
import clsx from "clsx";

export const Title: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h3
      className={clsx(
        "font-medium mb-[6px] md:mb-4 text-[#452917] font-lexend",
        responsiveFontSizeArray(24, 36)
      )}
    >
      {children}
    </h3>
  );
};
