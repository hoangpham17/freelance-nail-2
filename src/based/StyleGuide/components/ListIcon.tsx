import React from "react";
import { Flex, Tooltip } from "antd";

import SvgIcon from "../../SvgIcon";

type IconProps = {
  url: string;
  handleCopy: (text: string) => void;
};

const Icon: React.FC<IconProps> = ({ url, handleCopy }) => {
  return (
    <Tooltip title={url} className="cursor-pointer">
      <Flex
        vertical
        gap={8}
        onClick={() =>
          handleCopy(
            `<SvgIcon src={"${url}"} ariaLabel="text" width={24} height={24} className="size-[24px] shrink-0" />`
          )
        }
      >
        <SvgIcon
          src={url}
          ariaLabel="text"
          width={24}
          height={24}
          className="size-[24px] shrink-0 text-black"
        />
      </Flex>
    </Tooltip>
  );
};

type ListIconProps = {
  handleCopy: (text: string) => void;
};

export const ListIcon: React.FC<ListIconProps> = ({ handleCopy }) => {
  const listIcon = [
    "/assets/svgs/burger-menu.svg",
    "/assets/svgs/pinterest.svg",
    "/assets/svgs/fb.svg",
    "/assets/svgs/google.svg",
    "/assets/svgs/instagram.svg",
    "/assets/svgs/phone.svg",
    "assets/svgs/additional-services.svg",
    "assets/svgs/facial-relax.svg",
    "assets/svgs/head-spa.svg",
    "assets/svgs/eyelash.svg",
    "assets/svgs/kid-service.svg",
    "assets/svgs/waxing.svg",
    "assets/svgs/manicure.svg",
    "assets/svgs/pedicure.svg",
    "assets/svgs/nail-enhancements.svg",
    "assets/svgs/x-close.svg",
    "assets/svgs/arrow-right-circle.svg",
    "assets/svgs/chevron-right.svg",
    "assets/svgs/search.svg",
    "assets/svgs/arrow-detail.svg",
    "assets/svgs/foward.svg",
  ];

  return (
    <Flex vertical gap={12}>
      <p className="text-lg font-bold">Icon</p>
      <p>{`<SvgIcon src={url} ariaLabel="text" width={24} height={24} className="size-[24px] shrink-0" />`}</p>
      <Flex gap={8} className="w-full flex-wrap">
        {listIcon.map((item) => (
          <Icon url={item} key={item} handleCopy={handleCopy} />
        ))}
      </Flex>
    </Flex>
  );
};
