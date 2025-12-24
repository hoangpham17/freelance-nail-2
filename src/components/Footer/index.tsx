import React from "react";
import Location from "./components/Location";
import BusinessHours from "./components/BusinessHours";
import KeepInTouch from "./components/KeepInTouch";
import BottomNav from "./components/BottomNav";
import { Flex } from "antd";
import { Wrapper } from "@/based/components/Wrapper";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#D5B994] z-10">
      <Flex vertical gap={20}>
        <Wrapper className="pt-[50px] lg:pt-6 pb-[100px] lg:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-5">
            <Location />
            <BusinessHours />
            <KeepInTouch />
          </div>
        </Wrapper>
        <BottomNav />
      </Flex>
    </footer>
  );
};

export default Footer;
