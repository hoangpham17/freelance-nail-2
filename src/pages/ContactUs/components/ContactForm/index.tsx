import React from "react";
import { Form, Input, Button } from "antd";
import type { InputRef } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  AIRTABLE_WRITE_ENDPOINTS,
  createAirtableRecord,
} from "@/services/airtable-write.service";
import SvgIcon from "@/based/SvgIcon";
import FormResultModal from "@/components/FormResultModal";
import contactUsContent from "@/content/contactUs.json";

const { TextArea } = Input;

type ContactUsContent = {
  form: {
    labels: {
      name: string;
      phone: string;
      email: string;
      message: string;
      messageOptional: string;
    };
    placeholders: {
      name: string;
      phone: string;
      email: string;
      message: string;
      messageSignup: string;
    };
    validation: {
      nameRequired: string;
      phoneRequired: string;
      phoneMinDigits: string;
      phoneMaxDigits: string;
      emailRequired: string;
      emailInvalid: string;
    };
    buttons: {
      send: string;
      signUp: string;
      sending: string;
      signingUp: string;
    };
    successMessageSignup: string;
  };
};

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export interface ContactFormProps {
  isSignup?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isSignup = false }) => {
  const c = (contactUsContent as ContactUsContent).form;
  const [form] = Form.useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isPhoneEditing, setIsPhoneEditing] = React.useState(true);
  const phoneInputRef = React.useRef<InputRef | null>(null);
  const phoneValue = Form.useWatch("phone", form);

  // Get only digits from phone number
  const getPhoneDigits = (value: string): string => {
    return value ? value.replace(/\D/g, "") : "";
  };

  const formatPhoneDigits = (digitsValue: string): string => {
    const digits = digitsValue;
    if (!digits) return "";

    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 6);
    const p3 = digits.slice(6);

    if (digits.length <= 3) return `(${p1}`;
    if (digits.length <= 6) return `(${p1}) ${p2}`;
    return `(${p1}) ${p2}-${p3}`;
  };

  // Phone validation - check min 9 and max 10 digits
  const validatePhone = (_: unknown, value: string) => {
    const digits = getPhoneDigits(value);
    if (digits.length === 0) {
      return Promise.reject(new Error(c.validation.phoneRequired));
    }
    if (digits.length < 9) {
      return Promise.reject(new Error(c.validation.phoneMinDigits));
    }
    if (digits.length > 12) {
      return Promise.reject(new Error(c.validation.phoneMaxDigits));
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Map form data to Airtable fields
      const airtableFields = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message || "",
        ...(isSignup && { is_signup_promote: true }),
      };

      await createAirtableRecord(
        AIRTABLE_WRITE_ENDPOINTS.guest_contact,
        airtableFields,
      );

      setIsSuccess(true);
      setIsModalOpen(true);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setIsSuccess(false);
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const labelClass = clsx(
    "text-madison-gold font-sans font-medium",
    responsiveFontSizeArray(14, 15),
  );
  const inputClass = clsx(
    "pl-11 pr-4 py-3 rounded-lg !border !border-madison-border/80 h-11 lg:h-12",
    "bg-madison-black-soft text-madison-text placeholder:text-madison-muted/50",
    "focus:!border-madison-gold focus:!shadow-[0_0_0_1px_var(--madison-gold)] hover:!border-madison-gold/40",
    "transition-colors outline-none",
    responsiveFontSizeArray(14, 16),
  );
  const iconClass = "shrink-0 text-madison-gold-dark";

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className={clsx(
        "[&_.ant-form-item]:mb-5 [&_.ant-form-item]:lg:mb-6",
        "[&_.ant-form-item-control]:relative",
        "[&_.ant-form-item-additional]:absolute [&_.ant-form-item-additional]:inset-x-0 [&_.ant-form-item-additional]:top-0 [&_.ant-form-item-additional]:z-20 [&_.ant-form-item-additional]:pointer-events-none [&_.ant-form-item-additional]:!h-0 [&_.ant-form-item-additional]:!min-h-0 [&_.ant-form-item-additional]:!m-0 [&_.ant-form-item-additional]:!p-0",
        "[&_.ant-form-item-explain]:absolute [&_.ant-form-item-explain]:left-11 [&_.ant-form-item-explain]:right-3 [&_.ant-form-item-explain]:top-0.5",
        "[&_.ant-form-item-explain-error]:text-red-500 [&_.ant-form-item-explain-error]:text-xs [&_.ant-form-item-explain-error]:leading-4",
        "[&_.ant-form-item-margin-offset]:!mb-0",
      )}
    >
      <Form.Item
        name="name"
        label={<span className={labelClass}>{c.labels.name}</span>}
        rules={[{ required: true, message: c.validation.nameRequired }]}
      >
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <SvgIcon
              src="/assets/svgs/user.svg"
              ariaLabel="user"
              width={20}
              height={20}
              className={iconClass}
            />
          </div>
          <Input
            type="text"
            placeholder={c.placeholders.name}
            className={inputClass}
          />
        </div>
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6">
        <Form.Item
          name="phone"
          label={<span className={labelClass}>{c.labels.phone}</span>}
          rules={[{ validator: validatePhone }]}
        >
          <div
            className="relative"
            onClick={() => {
              if (isPhoneEditing) return;
              setIsPhoneEditing(true);
              setTimeout(() => phoneInputRef.current?.focus(), 0);
            }}
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <SvgIcon
                src="/assets/svgs/phone.svg"
                ariaLabel="phone"
                width={20}
                height={20}
                className={iconClass}
              />
            </div>
            <Input
              type="tel"
              placeholder={c.placeholders.phone}
              ref={phoneInputRef}
              tabIndex={isPhoneEditing ? 0 : -1}
              readOnly={!isPhoneEditing}
              onFocus={() => setIsPhoneEditing(true)}
              onBlur={() => setIsPhoneEditing(false)}
              maxLength={12}
              className={clsx(
                inputClass,
                !isPhoneEditing && "!opacity-0 !pointer-events-none",
              )}
            />

            <div
              className={clsx(
                "absolute inset-0 flex items-center pl-11 pr-4 border rounded-lg border-madison-border/80",
                "h-11 lg:h-12 bg-black/40",
                "cursor-text select-none",
                isPhoneEditing && "opacity-0 pointer-events-none",
              )}
            >
              <span
                className={clsx(
                  "text-madison-text",
                  !phoneValue ||
                    getPhoneDigits(String(phoneValue)).length === 0
                    ? "text-madison-muted/50"
                    : "",
                )}
              >
                {phoneValue
                  ? formatPhoneDigits(getPhoneDigits(String(phoneValue)))
                  : c.placeholders.phone}
              </span>
            </div>
          </div>
        </Form.Item>
        <Form.Item
          name="email"
          label={<span className={labelClass}>{c.labels.email}</span>}
          rules={[
            { required: true, message: c.validation.emailRequired },
            { type: "email", message: c.validation.emailInvalid },
          ]}
        >
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <SvgIcon
                src="/assets/svgs/email.svg"
                ariaLabel="email"
                width={20}
                height={20}
                className={iconClass}
              />
            </div>
            <Input
              type="email"
              placeholder={c.placeholders.email}
              className={inputClass}
            />
          </div>
        </Form.Item>
      </div>

      <Form.Item
        name="message"
        label={
          <span className={labelClass}>
            {isSignup ? c.labels.messageOptional : c.labels.message}
          </span>
        }
      >
        <div className="relative">
          <div className="absolute left-3 top-4 z-10 pointer-events-none">
            <SvgIcon
              src="/assets/svgs/chat.svg"
              ariaLabel="message"
              width={20}
              height={20}
              className={iconClass}
            />
          </div>
          <TextArea
            placeholder={
              isSignup ? c.placeholders.messageSignup : c.placeholders.message
            }
            rows={5}
            className={clsx(inputClass, "!h-auto min-h-[120px] pt-3 resize-y")}
          />
        </div>
      </Form.Item>

      <Form.Item className="!mb-0 !mt-2">
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          className={clsx(
            "madison-btn-primary !w-full !h-11 lg:!h-12 !rounded-lg",
            "!text-madison-gold-text !font-semibold !uppercase",
            "hover:!opacity-90 disabled:!opacity-50 disabled:!cursor-not-allowed !border-0",
            responsiveFontSizeArray(16, 18),
          )}
        >
          {isSubmitting
            ? isSignup
              ? c.buttons.signingUp
              : c.buttons.sending
            : isSignup
              ? c.buttons.signUp
              : c.buttons.send}
        </Button>
      </Form.Item>
      <FormResultModal
        open={isModalOpen}
        isSuccess={isSuccess}
        onClose={handleCloseModal}
        successMessage={isSignup ? c.successMessageSignup : undefined}
      />
    </Form>
  );
};

export default ContactForm;
