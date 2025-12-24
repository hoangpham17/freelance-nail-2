import clsx from "clsx";

export const Title: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h3
      className={clsx(
        "text-[36px] mb-[6px] lg:mb-4 text-[#452917] font-lexend"
      )}
    >
      {children}
    </h3>
  );
};
