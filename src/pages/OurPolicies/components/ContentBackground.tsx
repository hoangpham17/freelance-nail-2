import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import { useScreen } from "@/hooks/useScreen";

/** Background vùng content (dưới hero) — shapes + flowers trang trí nhẹ */
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
        width={isDesktop ? 110 : 75}
        height={isDesktop ? 120 : 82}
        className="top-[2%] left-[8%] lg:left-[10%]"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-2.svg"
          ariaLabel=""
          width={isDesktop ? 110 : 75}
          height={isDesktop ? 120 : 82}
          className="shrink-0 text-[#805D3D40] max-md:opacity-45"
        />
      </DecorItem>
      <SvgIcon
        src="/assets/images/HomePage/shape-2.svg"
        ariaLabel=""
        width={isDesktop ? 280 : 180}
        height={isDesktop ? 190 : 120}
        className="shrink-0 text-[#805D3D35] absolute top-[20%] lg:-right-[2%] -right-[10%] rotate-45"
      />
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 200 : 130}
        height={isDesktop ? 220 : 140}
        className="top-[15%] lg:-left-[4%] -left-[12%]"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-1.svg"
          ariaLabel=""
          width={isDesktop ? 200 : 130}
          height={isDesktop ? 220 : 140}
          className="shrink-0 text-[#805D3D50] max-md:opacity-50"
        />
      </DecorItem>
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
          className="shrink-0 text-[#805D3D45] max-md:opacity-50"
        />
      </DecorItem>
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 160 : 100}
        height={isDesktop ? 180 : 110}
        className="top-[45%] right-[5%] lg:right-[12%]"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-3.svg"
          ariaLabel=""
          width={isDesktop ? 160 : 100}
          height={isDesktop ? 180 : 110}
          className="shrink-0 text-[#805D3D40] max-md:opacity-40"
        />
      </DecorItem>
      {/* flower-1 bên trái giữa — tách xa shape-1 (bottom 10%) và flower-1 trên (top 15%) */}
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 140 : 90}
        height={isDesktop ? 150 : 95}
        className="top-[58%] left-[4%] lg:left-[6%]"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-1.svg"
          ariaLabel=""
          width={isDesktop ? 140 : 90}
          height={isDesktop ? 150 : 95}
          className="shrink-0 text-[#805D3D35] max-md:opacity-40"
        />
      </DecorItem>
      {/* flower-2 góc phải dưới — tách xa flower-2 (bottom 25%) và flower-3 (top 45%) */}
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 120 : 80}
        height={isDesktop ? 160 : 105}
        className="bottom-[2%] right-1/4"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-2.svg"
          ariaLabel=""
          width={isDesktop ? 120 : 80}
          height={isDesktop ? 160 : 105}
          className="shrink-0 text-[#805D3D38] max-md:opacity-40"
        />
      </DecorItem>
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 100 : 70}
        height={isDesktop ? 110 : 75}
        className="top-[30%] left-[3%] lg:left-[5%]"
      >
        <SvgIcon
          src="/assets/images/HomePage/flower-3.svg"
          ariaLabel=""
          width={isDesktop ? 100 : 70}
          height={isDesktop ? 110 : 75}
          className="shrink-0 text-[#805D3D30] max-md:opacity-35"
        />
      </DecorItem>
    </div>
  );
};
