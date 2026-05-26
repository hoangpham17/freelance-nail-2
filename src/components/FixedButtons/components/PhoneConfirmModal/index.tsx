import React from "react";
import { Modal, Button } from "antd";
import { CloseOutlined, PhoneOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

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
      width="90%"
      style={{ maxWidth: "420px" }}
      closable
      closeIcon={<CloseOutlined className="text-[18px]" />}
      className={clsx(
        "phone-confirm-modal",
        // Modal shell
        "[&_.ant-modal-content]:rounded-2xl",
        "[&_.ant-modal-content]:overflow-hidden",
        "[&_.ant-modal-content]:border",
        "[&_.ant-modal-content]:border-madison-border/70",
        "[&_.ant-modal-content]:bg-madison-black-soft",
        "[&_.ant-modal-content]:shadow-[0_20px_70px_rgba(0,0,0,0.55)]",
        "[&_.ant-modal-body]:p-8",
        // Close button (top-right corner)
        "[&_.ant-modal-close]:top-3 [&_.ant-modal-close]:right-3",
        "[&_.ant-modal-close]:w-10 [&_.ant-modal-close]:h-10",
        "[&_.ant-modal-close]:rounded-full [&_.ant-modal-close]:grid [&_.ant-modal-close]:place-items-center",
        "[&_.ant-modal-close]:text-madison-text-muted/70",
        "[&_.ant-modal-close:hover]:text-madison-text",
        "[&_.ant-modal-close:hover]:bg-white/5",
        "[&_.ant-modal-close]:transition-colors",
      )}
    >
      <div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="mx-auto mb-3 w-14 h-14 rounded-2xl grid place-items-center border border-madison-border/70 bg-black/30">
            <PhoneOutlined className="text-3xl text-madison-gold-dark" />
          </div>
          <h3
            className={clsx(
              "font-semibold text-madison-text",
              responsiveFontSizeArray(18, 22),
            )}
          >
            Call Us?
          </h3>
          <p
            className={clsx(
              "font-light text-madison-text-muted",
              responsiveFontSizeArray(13, 15),
            )}
          >
            Do you want to call
          </p>
          <p
            className={clsx(
              "mt-2 font-semibold tracking-wide text-madison-gold-dark tabular-nums",
              responsiveFontSizeArray(20, 28),
            )}
          >
            {phoneNumber}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 w-full">
          <Button
            type="primary"
            size="large"
            icon={<PhoneOutlined />}
            onClick={onConfirm}
            className={clsx(
              "w-full madison-btn-primary !h-12 !rounded-xl",
              "!text-madison-gold-text !font-semibold !uppercase",
              "hover:!opacity-90",
            )}
          >
            Call Now
          </Button>
          <Button
            size="large"
            onClick={onCancel}
            className={clsx(
              "w-full !h-12 !rounded-xl !bg-transparent",
              "!border !border-madison-gold-dark/80",
              "!text-madison-text !font-semibold",
              "hover:!border-madison-gold hover:!text-madison-gold",
            )}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PhoneConfirmModal;
