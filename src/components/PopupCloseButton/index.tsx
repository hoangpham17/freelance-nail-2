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
      "flex size-8 lg:size-10 cursor-pointer items-center justify-center rounded-full border border-madison-gold bg-madison-black-soft/80 shadow-[0_10px_26px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95",
      className,
    )}
    {...rest}
  >
    <SvgIcon
      src="/assets/svgs/x-close.svg"
      ariaLabel=""
      width={24}
      height={24}
      className="size-[24px] shrink-0 text-madison-gold"
    />
  </button>
);

export default PopupCloseButton;
