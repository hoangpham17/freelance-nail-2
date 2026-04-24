import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import { useScreen } from "@/hooks/useScreen";

export const Background = () => {
  const { isDesktop } = useScreen();
  return (
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[1] max-w-[1920px]">
      <SvgIcon
        src={"/assets/images/HomePage/shape-1.svg"}
        ariaLabel="text"
        width={isDesktop ? 595 : 395}
        height={isDesktop ? 411 : 211}
        className="shrink-0 text-[#E8D6C9] absolute lg:top-[2%] top-4 lg:-left-[2%] -left-[25%]"
      />
      <SvgIcon
        src={"/assets/images/HomePage/shape-2.svg"}
        ariaLabel="text"
        width={isDesktop ? 520 : 320}
        height={isDesktop ? 350 : 250}
        className="shrink-0 text-[#805D3D73] absolute lg:-bottom-4 -bottom-2 lg:-left-28 -left-10 lg:-rotate-[85deg] -rotate-[75deg] opacity-45"
      />
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 357 : 197}
        height={isDesktop ? 377 : 217}
        className="lg:top-[12%] top-10 lg:right-[20%] -right-10"
      >
        <SvgIcon
          src={"/assets/images/HomePage/flower-3.svg"}
          ariaLabel="text"
          width={isDesktop ? 357 : 197}
          height={isDesktop ? 377 : 217}
          className="shrink-0 text-[#805D3D66] max-md:opacity-50"
        />
      </DecorItem>
    </div>
  );
};
