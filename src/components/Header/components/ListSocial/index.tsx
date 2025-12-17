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
  {
    name: "Google",
    href: "https://www.google.com",
    iconUrl: "/assets/svgs/google.svg",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com",
    iconUrl: "/assets/svgs/pinterest.svg",
  },
];

export const ListSocial = () => {
  const { isDesktop } = useScreen();

  const iconSize = useMemo(() => (isDesktop ? 14 : 24), [isDesktop]);

  return (
    <Flex className="gap-[6px] lg:gap-2">
      {listSocial.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center hover:opacity-80 !text-[#9E7B6A]"
        >
          <SvgIcon
            src={item.iconUrl}
            ariaLabel="text"
            width={iconSize}
            height={iconSize}
            className="shrink-0"
          />
        </a>
      ))}
    </Flex>
  );
};
