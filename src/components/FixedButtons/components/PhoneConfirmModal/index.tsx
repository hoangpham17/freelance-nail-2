import React from "react";
import { Modal, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
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
      closable={false}
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
      )}
    >
      <div className="relative flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute right-4 top-4 w-9 h-9 rounded-full grid place-items-center text-madison-text-muted/70 hover:text-madison-text hover:bg-white/5 transition-colors"
        >
          <span className="text-xl leading-none">×</span>
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl grid place-items-center border border-madison-border/70 bg-black/30">
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
              "mt-2 font-light text-madison-text-muted",
              responsiveFontSizeArray(13, 15),
            )}
          >
            Do you want to call
          </p>
          <p
            className={clsx(
              "mt-3 font-semibold tracking-wide text-madison-gold-dark",
              responsiveFontSizeArray(20, 28),
            )}
          >
            {phoneNumber}
          </p>
        </div>

        <div className="flex flex-row gap-3 w-full">
          <Button
            type="primary"
            size="large"
            icon={<PhoneOutlined />}
            onClick={onConfirm}
            className={clsx(
              "flex-1 madison-btn-primary !h-12 !rounded-xl",
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
              "flex-1 !h-12 !rounded-xl !bg-transparent",
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
