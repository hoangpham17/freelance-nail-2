import { Flex } from "antd";
import SvgIcon from "../../../../based/SvgIcon";
import { useScreen } from "../../../../hooks/useScreen";
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
  const { isDesktop } = useScreen();

  const iconSize = useMemo(() => (isDesktop ? 16 : 14), [isDesktop]);

  return (
    <Flex className="gap-[6px] lg:gap-2">
      {listSocial.map((item) => (
        <a
          key={item.name}
          title={item.name}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center bg-[#F6EFE9] w-6 h-6 rounded-full hover:bg-white"
        >
          <SvgIcon
            src={item.iconUrl}
            ariaLabel="text"
            width={iconSize}
            height={iconSize}
            className="shrink-0 text-[#A1744F]"
          />
        </a>
      ))}
    </Flex>
  );
};
