import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import { useScreen } from "@/hooks/useScreen";

export const Background = () => {
  const { isDesktop } = useScreen();
  return (
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[1] max-w-[1920px]">
      <DecorItem
        isMovingWhenScroll
        className="-top-4 left-0"
        width={isDesktop ? 360 : 260}
        height={isDesktop ? 280 : 200}
      >
        <div 
          style={{
            transform: "rotateX(180deg) translateZ(100px)",
          }}>
        <SvgIcon
          src={"/assets/images/HomePage/flower-3.svg"}
          ariaLabel="text"
          width={isDesktop ? 360 : 260}
          height={isDesktop ? 280 : 200}
          className="shrink-0 text-[#805D3D66] opacity-60 max-lg:opacity-50"
        />
        </div>
      </DecorItem>
    </div>
  );
};
