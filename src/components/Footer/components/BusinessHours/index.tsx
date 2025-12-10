import React from "react";
import { Title } from "../Title";
import { Flex } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const BusinessHours: React.FC = () => {
  const hours = [
    { day: "Monday - Friday", time: "9.00am - 7.00pm" },
    { day: "Saturday", time: "9.00am - 4.00pm" },
    { day: "Sunday", time: "11.00am - 4.00pm" },
  ];

  return (
    <Flex vertical>
      <Title>BUSINESS HOURS</Title>
      <Flex vertical gap={4}>
        {hours.map((hour) => (
          <Flex key={hour.day} align="center">
            <span
              className={clsx(
                "font-medium text-[#452917] w-1/2",
                responsiveFontSizeArray(12, 20)
              )}
            >
              {hour.day}
            </span>
            <span
              className={clsx(
                "text-[#494747] font-semibold w-1/2",
                responsiveFontSizeArray(18, 24)
              )}
            >
              {hour.time}
            </span>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default BusinessHours;
