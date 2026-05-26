import { Flex } from "antd";
import SvgIcon from "../../../../based/SvgIcon";
import { useScreen } from "../../../../hooks/useScreen";
import { BREAKPOINTS } from "@/shared/utils/helper";
import { useMemo } from "react";

const listSocial = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/madisonnaillounge/",
    iconUrl: "/assets/svgs/instagram.svg",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/madisonnailloungewi",
    iconUrl: "/assets/svgs/fb.svg",
  },
];

export const ListSocial = () => {
  const { isDesktop, width } = useScreen();
  const iconSize = useMemo(() => {
    if (width >= BREAKPOINTS["2xl"]) return 22;
    return isDesktop ? 18 : 16;
  }, [isDesktop, width]);

  return (
    <Flex className="gap-2">
      {listSocial.map((item) => (
        <a
          key={item.name}
          title={item.name}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:text-madison-gold"
        >
          <SvgIcon
            src={item.iconUrl}
            ariaLabel={item.name}
            width={iconSize}
            height={iconSize}
            className="shrink-0 text-current"
          />
        </a>
      ))}
    </Flex>
  );
};
