import React from "react";
import { Modal, Button } from "antd";
import { CloseCircleOutlined, CheckOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SubmitSuccessLottieOverlay } from "@/components/SubmitSuccessLottie";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
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
          maxWidth: "520px",
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
          "[&_.ant-modal-content]:rounded-[1.75rem]",
          "[&_.ant-modal-content]:overflow-hidden",
          "[&_.ant-modal-content]:border",
          "[&_.ant-modal-content]:border-madison-gold/25",
          "[&_.ant-modal-content]:bg-madison-black-soft",
          "[&_.ant-modal-content]:shadow-[0_24px_80px_rgba(0,0,0,0.6)]",
          "[&_.ant-modal-body]:px-8",
          "[&_.ant-modal-body]:py-12",
          "[&_.ant-modal-body]:sm:px-12",
        )}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          {isSuccess ? (
            <div className="relative grid place-items-center" aria-hidden>
              <span className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(249,190,92,0.22),_transparent_68%)]" />
              <span className="grid h-[4.75rem] w-[4.75rem] place-items-center rounded-full border border-madison-gold/45 bg-gradient-to-b from-madison-gold/20 to-transparent shadow-[0_0_30px_-8px_rgba(249,190,92,0.55)]">
                <CheckOutlined className="text-4xl text-madison-gold" />
              </span>
            </div>
          ) : (
            <div
              className="grid h-16 w-16 place-items-center rounded-2xl border border-madison-border/70 bg-black/30"
              aria-hidden
            >
              <CloseCircleOutlined className="text-3xl text-[#c97a72]" />
            </div>
          )}

          {isSuccess ? (
            <div className="flex flex-col items-center gap-2">
              <h3
                className={clsx(
                  "m-0 whitespace-nowrap font-tangerine leading-[1.02] text-gold-gradient",
                  responsiveFontSizeArray(34, 56),
                )}
              >
                {title}
              </h3>
              <SectionHeadingLine className="mx-auto" />
            </div>
          ) : (
            <h3
              className={clsx(
                "m-0 font-semibold tracking-wide text-madison-text",
                responsiveFontSizeArray(18, 22),
              )}
            >
              {title}
            </h3>
          )}

          <p
            className={clsx(
              "max-w-[26rem] font-light leading-relaxed whitespace-pre-line text-madison-text-muted",
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
              "madison-btn-primary !min-w-[150px] !h-12 !rounded-[36px]",
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
