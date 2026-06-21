import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";

export const POPUP_CLOSE_OVERLAY_CLASS =
  "absolute -top-2.5 -right-2.5 z-[2]";

export interface PopupCloseButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  ariaLabel?: string;
}

export const PopupCloseButton: React.FC<PopupCloseButtonProps> = ({
  ariaLabel = "Close popup",
  className,
  type = "button",
  ...rest
}) => (
  <button
    type={type}
    aria-label={ariaLabel}
    className={clsx(
      "flex size-9 lg:size-10 cursor-pointer items-center justify-center rounded-full border border-[#f9be5c]/20 bg-[#0a0908]/60 backdrop-blur-md transition-all duration-300",
      "hover:border-[#f9be5c]/60 hover:text-[#ffe5a0] hover:shadow-[0_0_14px_rgba(249,190,92,0.16)]",
      "active:scale-95",
      className,
    )}
    {...rest}
  >
    <SvgIcon
      src="/assets/svgs/x-close.svg"
      ariaLabel=""
      width={20}
      height={20}
      className="size-5 shrink-0 text-[#f9be5c]"
    />
  </button>
);

export default PopupCloseButton;
