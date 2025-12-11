import React from "react";
import { Modal, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

interface PhoneConfirmModalProps {
  open: boolean;
  phoneNumber: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const PhoneConfirmModal: React.FC<PhoneConfirmModalProps> = ({
  open,
  phoneNumber,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      className="phone-confirm-modal"
      width="90%"
      style={{ maxWidth: "400px" }}
    >
      <div className="flex flex-col items-center gap-6 py-4">
        <div className="text-center">
          <PhoneOutlined className="text-5xl text-[#9E7B6A] mb-4" />
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            Call Us?
          </h3>
          <p className="text-base md:text-lg text-gray-600 mb-1">
            Do you want to call
          </p>
          <p className="text-xl md:text-2xl font-bold text-[#9E7B6A]">
            {phoneNumber}
          </p>
        </div>

        <div className="flex flex-row gap-3 w-full">
          <Button
            type="primary"
            size="large"
            icon={<PhoneOutlined />}
            onClick={onConfirm}
            className="flex-1 h-12 text-base font-semibold"
            style={{
              backgroundColor: "#9E7B6A",
              borderColor: "#9E7B6A",
            }}
          >
            Call Now
          </Button>
          <Button
            size="large"
            onClick={onCancel}
            className="flex-1 h-12 text-base font-semibold"
            style={{
              borderColor: "#9E7B6A",
              color: "#9E7B6A",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PhoneConfirmModal;
