import React from "react";
import { Modal, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SubmitSuccessLottieOverlay } from "@/components/SubmitSuccessLottie";
import commonContent from "@/content/common.json";

const MODAL_Z_INDEX = 100002;
const LOTTIE_OVERLAY_Z_INDEX = 100001;
const MODAL_MASK_STYLE: React.CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.72)",
};

interface FormResultModalProps {
  open: boolean;
  isSuccess: boolean;
  onClose: () => void;
  successMessage?: string;
  errorMessage?: string;
}

const FormResultModal: React.FC<FormResultModalProps> = ({
  open,
  isSuccess,
  onClose,
  successMessage = (commonContent as { formResultModal: { defaultSuccessMessage: string } })
    .formResultModal.defaultSuccessMessage,
  errorMessage = (commonContent as { formResultModal: { defaultErrorMessage: string } })
    .formResultModal.defaultErrorMessage,
}) => {
  const message = isSuccess ? successMessage : errorMessage;
  const title = isSuccess ? "Thank you!" : "Something went wrong";

  return (
    <>
      <SubmitSuccessLottieOverlay
        active={open && isSuccess}
        zIndex={LOTTIE_OVERLAY_Z_INDEX}
      />

      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width="90%"
        style={{
          maxWidth: "440px",
          zIndex: MODAL_Z_INDEX,
        }}
        closable={false}
        mask
        maskClosable={false}
        maskStyle={MODAL_MASK_STYLE}
        styles={{ mask: MODAL_MASK_STYLE }}
        className={clsx(
          "form-result-modal",
          "[&_.ant-modal-mask]:!bg-black/70",
          "[&_.ant-modal-content]:rounded-2xl",
          "[&_.ant-modal-content]:overflow-hidden",
          "[&_.ant-modal-content]:border",
          "[&_.ant-modal-content]:border-madison-border/70",
          "[&_.ant-modal-content]:bg-madison-black-soft",
          "[&_.ant-modal-content]:shadow-[0_20px_70px_rgba(0,0,0,0.55)]",
          "[&_.ant-modal-body]:px-8",
          "[&_.ant-modal-body]:py-10",
        )}
      >
        <div className="flex flex-col items-center gap-7 text-center">
          {!isSuccess && (
            <div
              className="grid h-14 w-14 place-items-center rounded-2xl border border-madison-border/70 bg-black/30"
              aria-hidden
            >
              <CloseCircleOutlined className="text-3xl text-[#c97a72]" />
            </div>
          )}

          <h3
            className={clsx(
              "m-0 font-semibold tracking-wide text-madison-text",
              responsiveFontSizeArray(18, 22),
            )}
          >
            {title}
          </h3>

          <p
            className={clsx(
              "max-w-[22rem] font-light leading-relaxed whitespace-pre-line text-madison-text-muted",
              responsiveFontSizeArray(15, 17),
            )}
          >
            {message}
          </p>

          <Button
            type="primary"
            size="large"
            onClick={onClose}
            className={clsx(
              "madison-btn-primary !min-w-[140px] !h-12 !rounded-[36px]",
              "!border-0 !font-semibold !uppercase",
              "hover:!opacity-90",
              responsiveFontSizeArray(16, 18),
            )}
          >
            {(commonContent as { formResultModal: { okButton: string } }).formResultModal.okButton}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FormResultModal;
