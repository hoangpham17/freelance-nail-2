import SvgIcon from "@/based/SvgIcon";

export const Background = () => {
  return (
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[1] max-w-[1920px]">
      <SvgIcon
        src={"/assets/images/HomePage/shape-2.svg"}
        ariaLabel="text"
        width={470}
        height={300}
        className="shrink-0 text-[#FFFFFF99] absolute bottom-0 left-0"
      />
        <SvgIcon
          src={"/assets/images/HomePage/flower-3.svg"}
          ariaLabel="text"
          width={650}
          height={550}
          className="shrink-0 text-white/25 absolute -bottom-28 -right-64 max-lg:opacity-50"
        />
    </div>
  );
};
