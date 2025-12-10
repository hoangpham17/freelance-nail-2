import { Flex, message } from "antd";

import { ListIcon } from "./components/ListIcon";

const StyleGuide: React.FC = () => {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success("Copy success");
    } catch (err) {
      message.error("Copy failed");
    }
  };
  return (
    <Flex vertical gap={12} className="bg-white p-6 mt-24">
      <ListIcon handleCopy={handleCopy} />
    </Flex>
  );
};

export default StyleGuide;
