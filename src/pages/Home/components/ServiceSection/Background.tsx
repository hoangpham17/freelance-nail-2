import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import { useScreen } from "@/hooks/useScreen";

export const Background = () => {
  const { isMobile } = useScreen();
  return (
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[1] max-w-[1920px]">
      <SvgIcon
        src={"/assets/images/HomePage/shape-1.svg"}
        ariaLabel="text"
        width={isMobile ? 275 : 470}
        height={isMobile ? 150 : 300}
        className="shrink-0 text-[#E8D6C9] absolute -top-[80px] md:-top-[200px] -left-[20%] md:left-[10%]"
      />
      <SvgIcon
        src={"/assets/images/HomePage/shape-1.svg"}
        ariaLabel="text"
        width={isMobile ? 275 : 470}
        height={isMobile ? 150 : 300}
        className="shrink-0 text-[#805D3D70] absolute md:bottom-[70px] bottom-[30px] md:-left-[380px] -left-[280px] rotate-[165deg]"
      />
      <SvgIcon
        src={"/assets/images/HomePage/shape-2.svg"}
        ariaLabel="text"
        width={isMobile ? 275 : 470}
        height={isMobile ? 150 : 300}
        className="shrink-0 text-[#805D3D73] absolute md:-top-12 -top-6 md:-right-32 -right-16"
      />
      <DecorItem
        isMovingWhenScroll
        className="md:top-[12%] top-[12%] md:-left-[12%] -left-[8%] "
        width={isMobile ? 313 : 513}
        height={isMobile ? 237 : 337}
      >
        <SvgIcon
          src={"/assets/images/HomePage/flower-1.svg"}
          ariaLabel="text"
          width={isMobile ? 313 : 513}
          height={isMobile ? 237 : 337}
          className="shrink-0 text-[#805D3D66] md:opacity-60 opacity-40"
        />
      </DecorItem>
      <DecorItem
        isMovingWhenScroll
        width={isMobile ? 177 : 257}
        height={isMobile ? 257 : 407}
        className="md:bottom-10 bottom-6 md:-right-10 -right-6"
      >
        <SvgIcon
          src={"/assets/images/HomePage/flower-2.svg"}
          ariaLabel="text"
          width={isMobile ? 177 : 257}
          height={isMobile ? 257 : 407}
          className="shrink-0 text-[#805D3D66] max-md:opacity-60"
        />
      </DecorItem>
    </div>
  );
};
