import { Button, ButtonProps } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "../../../../shared/utils/helper";

type ButtonStyle1Props = ButtonProps & {
  children: React.ReactNode;
  className?: string;
};

export const ButtonStyle1: React.FC<ButtonStyle1Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={clsx(
        "rounded-2xl !bg-[#9E7B6A] !text-white !border-none p-3 h-auto hover:opacity-80",
        responsiveFontSizeArray(14, 20),
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
