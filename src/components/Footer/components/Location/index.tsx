import React from "react";
import { Link } from "react-router-dom";
import { Flex, Image } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Title } from "../Title";

const Location: React.FC = () => {
  return (
    <Flex vertical>
      <Title>LOCATION</Title>
      <address className={"mb-2 text-[#494747] not-italic text-[20px]"}>
        795 UNIVERSITY AVE, MADISON, WI 53517
      </address>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        to="https://www.google.com/maps/dir//795+University+Ave,+Madison,+WI+53715,+Hoa+K%E1%BB%B3/@43.0730841,-89.4012631,17z/data=!4m18!1m8!3m7!1s0x8807accb3260e4e1:0x9f385919d918a110!2s795+University+Ave,+Madison,+WI+53715,+Hoa+K%E1%BB%B3!3b1!8m2!3d43.0730802!4d-89.3986882!16s%2Fg%2F11rg5z4kg4!4m8!1m0!1m5!1m1!1s0x8807accb3260e4e1:0x9f385919d918a110!2m2!1d-89.3986882!2d43.0730802!3e0?entry=ttu&g_ep=EgoyMDI1MTIwNy4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
        className={clsx(
          "text-[20px] mb-[6px] lg:mb-4 text-[#494747] hover:text-[#452917] underline",
          responsiveFontSizeArray(12, 20)
        )}
      >
        SHOW DIRECTION
      </Link>
      <div className="mt-2">
        <a
          href="https://www.google.com/maps/place/795+University+Ave,+Madison,+WI+53715,+USA/@43.0730841,-89.4012631,17z/data=!3m1!4b1!4m6!3m5!1s0x88065334cd27e4bf:0x1ab8575f0542d4b6!8m2!3d43.0730802!4d-89.3986882!16s%2Fg%2F11c5mj0zcb?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src="/assets/images/Footer/map.jpg"
            alt="Location Map"
            className="w-full max-w-[450px] rounded-lg transition-all"
            preview={false}
          />
        </a>
      </div>
    </Flex>
  );
};

export default Location;
