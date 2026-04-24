import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import { useScreen } from "@/hooks/useScreen";

/** Background vùng content About Us — shapes + flowers trang trí nhẹ */
export const ContentBackground = () => {
  const { isDesktop } = useScreen();
  return (
    <div
      className="absolute inset-0 z-0 max-w-[1920px] mx-auto pointer-events-none"
      aria-hidden
    >
      <SvgIcon
        src="/assets/images/HomePage/shape-1.svg"
        ariaLabel=""
        width={isDesktop ? 320 : 200}
        height={isDesktop ? 220 : 140}
        className="shrink-0 text-[#E8DED840] absolute bottom-[10%] lg:-left-[5%] -left-[15%]"
      />
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 170 : 110}
        height={isDesktop ? 190 : 110}
        className="top-[2%] left-[3%] lg:left-[5%]"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-2.svg"
          ariaLabel=""
          width={isDesktop ? 170 : 110}
          height={isDesktop ? 190 : 110}
          className="shrink-0 text-[#805D3D40] opacity-65 -rotate-45"
        />
      </DecorItem>
      <SvgIcon
        src="/assets/images/HomePage/shape-2.svg"
        ariaLabel=""
        width={isDesktop ? 280 : 180}
        height={isDesktop ? 190 : 120}
        className="shrink-0 text-[#805D3D35] absolute top-[10%] lg:-right-[2%] -right-[10%] rotate-45"
      />
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 180 : 120}
        height={isDesktop ? 240 : 160}
        className="bottom-[25%] right-0"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-2.svg"
          ariaLabel=""
          width={isDesktop ? 180 : 120}
          height={isDesktop ? 240 : 160}
          className="shrink-0 text-[#805D3D45] opacity-80"
        />
      </DecorItem>
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 140 : 90}
        height={isDesktop ? 150 : 95}
        className="top-[45%] left-[4%] lg:left-[6%]"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-3.svg"
          ariaLabel=""
          width={isDesktop ? 140 : 90}
          height={isDesktop ? 150 : 95}
          className="shrink-0 text-[#805D3D35] opacity-70 rotate-180"
        />
      </DecorItem>
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 120 : 80}
        height={isDesktop ? 160 : 105}
        className="bottom-[2%] right-1/4"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-1.svg"
          ariaLabel=""
          width={isDesktop ? 120 : 80}
          height={isDesktop ? 160 : 105}
          className="shrink-0 text-[#805D3D38] max-md:opacity-40"
        />
      </DecorItem>
    </div>
  );
};
