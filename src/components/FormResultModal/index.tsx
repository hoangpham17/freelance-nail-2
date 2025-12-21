import React from "react";
import { Modal, Button } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

interface FormResultModalProps {
  open: boolean;
  isSuccess: boolean;
  onClose: () => void;
}

const FormResultModal: React.FC<FormResultModalProps> = ({
  open,
  isSuccess,
  onClose,
}) => {
  const successMessage =
    "Thank you for contacting us regarding our\ncurrent products and prices";
  const errorMessage =
    "Sorry our system is experiencing some errors now,\nplease try again later.";

  const message = isSuccess ? successMessage : errorMessage;
  const Icon = isSuccess ? CheckCircleOutlined : CloseCircleOutlined;
  const iconColor = isSuccess ? "#52c41a" : "#ff4d4f";

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      className="form-result-modal"
      width="90%"
      style={{ maxWidth: "500px" }}
      closable={false}
    >
      <div className="flex flex-col items-center gap-6 py-4">
        <Icon className={clsx("text-6xl")} style={{ color: iconColor }} />
        <div className="text-center">
          <p
            className={clsx(
              "text-[#10182A] whitespace-pre-line",
              responsiveFontSizeArray(16, 18)
            )}
          >
            {message}
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={onClose}
          className={clsx(
            "px-8 py-2 h-auto rounded-xl !bg-[#8B7355] text-white border-none",
            "font-semibold",
            "hover:!bg-[#A67C52] transition-colors",
            responsiveFontSizeArray(16, 18)
          )}
        >
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default FormResultModal;
