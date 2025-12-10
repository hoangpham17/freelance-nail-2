import React from "react";
import Location from "./components/Location";
import BusinessHours from "./components/BusinessHours";
import KeepInTouch from "./components/KeepInTouch";
import BottomNav from "./components/BottomNav";
import { Flex } from "antd";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#D5B994]">
      <Flex vertical gap={20}>
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 pt-[50px] md:pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5">
            <Location />
            <BusinessHours />
            <KeepInTouch />
          </div>
        </div>
        <BottomNav />
      </Flex>
    </footer>
  );
};

export default Footer;
