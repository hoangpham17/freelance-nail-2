import clsx from "clsx";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  src: string;
  ariaLabel: string;
}

function SvgIcon(props: Props) {
  const {
    id = "id",
    src,
    ariaLabel,
    className = "h-full w-full",
    viewBox,
    width = 16,
    height = width,
  } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={clsx("pointer-events-none duration-300", className)}
      aria-label={ariaLabel}
    >
      <use href={`${src}#${id}`} width={width} height={height} />
    </svg>
  );
}

export default SvgIcon;

{
  /* 
  <SvgIcon
          src={url}
          ariaLabel="text"
          width={24}
          height={24}
          className="size-[24px] shrink-0 text-black"
        /> 
        */
}
