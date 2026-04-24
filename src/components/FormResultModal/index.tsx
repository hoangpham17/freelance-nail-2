import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import commonContent from "@/content/common.json";

const SUBMIT_SUCCESS_LOTTIE_URL = "/assets/images/submit-success.json";
/** Cao hơn mọi layout làm mờ trong app */
const MODAL_Z_INDEX = 100001;
const LOTTIE_OVERLAY_Z_INDEX = 100000;

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
  successMessage = (commonContent as { formResultModal: { defaultSuccessMessage: string } }).formResultModal.defaultSuccessMessage,
  errorMessage = (commonContent as { formResultModal: { defaultErrorMessage: string } }).formResultModal.defaultErrorMessage,
}) => {
  const [successLottieData, setSuccessLottieData] = useState<object | null>(
    null,
  );

  useEffect(() => {
    if (!open || !isSuccess) return;
    fetch(SUBMIT_SUCCESS_LOTTIE_URL)
      .then((res) => res.json())
      .then(setSuccessLottieData)
      .catch(() => {});
  }, [open, isSuccess]);

  const message = isSuccess ? successMessage : errorMessage;
  const showFullScreenLottie = open && isSuccess && successLottieData;

  const lottieOverlay = showFullScreenLottie && (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: LOTTIE_OVERLAY_Z_INDEX }}
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100%,177.78vh)] h-[max(100%,56.25vw)]"
        style={{ maxWidth: "none", maxHeight: "none" }}
      >
        <Lottie
          animationData={successLottieData}
          loop={false}
          className="w-full h-full"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Render Lottie vào body để nằm trên mọi layout làm mờ */}
      {typeof document !== "undefined" &&
        lottieOverlay &&
        createPortal(lottieOverlay, document.body)}

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
        mask={!isSuccess}
        className="[&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:overflow-hidden [&_.ant-modal-content]:border [&_.ant-modal-content]:border-[#EDE6E0] [&_.ant-modal-content]:shadow-[0_8px_32px_rgba(107,74,47,0.12)] [&_.ant-modal-body]:p-8"
      >
        <div className="flex flex-col items-center gap-6 py-2">
          {!isSuccess && (
            <CloseCircleOutlined
              className="text-4xl lg:text-5xl"
              style={{ color: "#A65D57" }}
            />
          )}
        <div className="text-center">
          <p
            className={clsx(
              "text-[#5C4D42] font-light leading-relaxed whitespace-pre-line",
              responsiveFontSizeArray(15, 17),
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
            "min-w-[140px] rounded-[36px] text-white h-12 font-playfairDisplay font-semibold border-0",
            "hover:opacity-90 transition-opacity",
            responsiveFontSizeArray(16, 18),
          )}
          style={{
            background: "linear-gradient(135deg, #805D3D 0%, #6B4A2F 100%)",
            boxShadow: "0px 4px 12px 0px #6B4A2F26",
          }}
        >
          {(commonContent as { formResultModal: { okButton: string } }).formResultModal.okButton}
        </Button>
      </div>
    </Modal>
    </>
  );
};

export default FormResultModal;
