import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import { useScreen } from "@/hooks/useScreen";

export const Background = () => {
  const { isDesktop } = useScreen();
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[1] max-w-[1920px]">
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 340 : 260}
        height={isDesktop ? 220 : 160}
        className="md:top-4 -top-1 md:left-0 -left-16"
      >
        <SvgIcon
          src={"/assets/images/HomePage/flower-3.svg"}
          ariaLabel="text"
          width={isDesktop ? 340 : 260}
          height={isDesktop ? 220 : 160}
          className="shrink-0 text-[#805D3D66]"
        />
      </DecorItem>
    </div>
  );
};
