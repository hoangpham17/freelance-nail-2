import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import { useScreen } from "@/hooks/useScreen";

export const Background = () => {
  const { isDesktop } = useScreen();
  return (
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[1] max-w-[1920px]">
      <DecorItem
        isMovingWhenScroll
        className="md:top-32 top-16 md:left-2/3 left-1/2 -translate-x-1/2"
        width={isDesktop ? 360 : 260}
        height={isDesktop ? 280 : 200}
      >
        <div 
          style={{
            transform: "rotateX(180deg) translateZ(100px)",
          }}>
        <SvgIcon
          src={"/assets/images/HomePage/flower-1.svg"}
          ariaLabel="text"
          width={isDesktop ? 500 : 300}
          height={isDesktop ? 300 : 200}
          className="shrink-0 text-[#805D3D66] opacity-40"
        />
        </div>
      </DecorItem>
    </div>
  );
};
