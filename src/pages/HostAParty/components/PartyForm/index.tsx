import React from "react";
import { PartyFormData } from "../../types";
import { Form, Input, Button, DatePicker } from "antd";
import type { InputRef } from "antd";
import dayjs from "dayjs";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  AIRTABLE_WRITE_ENDPOINTS,
  createAirtableRecord,
} from "@/services/airtable-write.service";
import SvgIcon from "@/based/SvgIcon";
import FormResultModal from "@/components/FormResultModal";
import hostAPartyContent from "@/content/hostAParty.json";

const { TextArea } = Input;

type HostAPartyFormContent = {
  partyForm: {
    labels: {
      name: string;
      phone: string;
      email: string;
      preferredDate: string;
      partySize: string;
      message: string;
    };
    placeholders: {
      name: string;
      phone: string;
      email: string;
      message: string;
    };
    placeholdersParty: { partySize: string };
    validation: {
      nameRequired: string;
      phoneRequired: string;
      phoneMinDigits: string;
      phoneMaxDigits: string;
      emailRequired: string;
      emailInvalid: string;
      dateRequired: string;
      dateFuture: string;
      partySizeRequired: string;
      partySizeMin: string;
    };
    buttons: { send: string; sending: string };
  };
};

const PartyForm: React.FC = () => {
  const pf = (hostAPartyContent as HostAPartyFormContent).partyForm;
  const [form] = Form.useForm<PartyFormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isPhoneEditing, setIsPhoneEditing] = React.useState(true);
  const phoneInputRef = React.useRef<InputRef | null>(null);
  const phoneValue = Form.useWatch("phone", form);

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

  const validatePhone = (_: unknown, value: string) => {
    const digits = getPhoneDigits(value);
    if (digits.length === 0) {
      return Promise.reject(new Error(pf.validation.phoneRequired));
    }
    if (digits.length < 9) {
      return Promise.reject(new Error(pf.validation.phoneMinDigits));
    }
    if (digits.length > 10) {
      return Promise.reject(new Error(pf.validation.phoneMaxDigits));
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values: PartyFormData) => {
    setIsSubmitting(true);
    try {
      const airtableFields = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        party_size: values.partySize ? parseInt(values.partySize, 10) : 0,
        message: values.message || "",
        date: values.date ? values.date.format("YYYY-MM-DD") : "",
      };

      await createAirtableRecord(
        AIRTABLE_WRITE_ENDPOINTS.host_a_party,
        airtableFields,
      );

      setIsSuccess(true);
      setIsModalOpen(true);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting party inquiry:", error);
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
    <>
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
          label={<span className={labelClass}>{pf.labels.name}</span>}
          rules={[{ required: true, message: pf.validation.nameRequired }]}
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
              placeholder={pf.placeholders.name}
              className={inputClass}
            />
          </div>
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6">
          <Form.Item
            name="phone"
            label={<span className={labelClass}>{pf.labels.phone}</span>}
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
                placeholder={pf.placeholders.phone}
                ref={phoneInputRef}
                tabIndex={isPhoneEditing ? 0 : -1}
                readOnly={!isPhoneEditing}
                onFocus={() => setIsPhoneEditing(true)}
                onBlur={() => setIsPhoneEditing(false)}
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
                    : pf.placeholders.phone}
                </span>
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="email"
            label={<span className={labelClass}>{pf.labels.email}</span>}
            rules={[
              { required: true, message: pf.validation.emailRequired },
              { type: "email", message: pf.validation.emailInvalid },
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
                placeholder={pf.placeholders.email}
                className={inputClass}
              />
            </div>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6">
          <Form.Item
            name="date"
            label={
              <span className={labelClass}>{pf.labels.preferredDate}</span>
            }
            rules={[
              {
                required: true,
                message: pf.validation.dateRequired,
              },

              {
                validator: (_, value) => {
                  const minDate = dayjs().startOf("day").add(2, "day");
                  if (value && value < minDate) {
                    return Promise.reject(new Error(pf.validation.dateFuture));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <SvgIcon
                  src="/assets/svgs/calendar.svg"
                  ariaLabel="calendar"
                  width={20}
                  height={20}
                  className={iconClass}
                />
              </div>

              <DatePicker
                format="MM/DD/YYYY"
                disabledDate={(current) =>
                  !!current && current < dayjs().startOf("day").add(2, "day")
                }
                onChange={(value) => {
                  form.setFieldValue("date", value || null);
                }}
                className={clsx(
                  "w-full !pl-11 !pr-4 !py-3 rounded-lg !border !border-madison-border/80 !h-11 lg:!h-12",
                  "!bg-madison-black-soft hover:!border-madison-gold/40",
                  "focus-within:!border-madison-gold focus-within:!shadow-[0_0_0_1px_var(--madison-gold)]",
                  "[&_.ant-picker-input>input]:text-madison-text [&_.ant-picker-input>input]:placeholder:text-madison-muted/50",
                  "[&_.ant-picker-suffix]:text-madison-gold-dark",
                  responsiveFontSizeArray(14, 16),
                )}
                suffixIcon={null}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="partySize"
            label={<span className={labelClass}>{pf.labels.partySize}</span>}
            rules={[
              { required: true, message: pf.validation.partySizeRequired },
              {
                pattern: /^[1-9]\d*$/,
                message: pf.validation.partySizeMin,
              },
            ]}
          >
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <SvgIcon
                  src="/assets/svgs/group-user.svg"
                  ariaLabel="party size"
                  width={20}
                  height={20}
                  className={iconClass}
                />
              </div>
              <Input
                type="number"
                placeholder={pf.placeholdersParty.partySize}
                min={1}
                className={inputClass}
              />
            </div>
          </Form.Item>
        </div>

        <Form.Item
          name="message"
          label={<span className={labelClass}>{pf.labels.message}</span>}
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
              placeholder={pf.placeholders.message}
              rows={5}
              className={clsx(
                inputClass,
                "!h-auto min-h-[120px] pt-3 resize-y",
              )}
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
              "!text-black !font-semibold !uppercase",
              "hover:!opacity-90 disabled:!opacity-50 disabled:!cursor-not-allowed !border-0",
              responsiveFontSizeArray(16, 18),
            )}
          >
            {isSubmitting ? pf.buttons.sending : pf.buttons.send}
          </Button>
        </Form.Item>
      </Form>
      <FormResultModal
        open={isModalOpen}
        isSuccess={isSuccess}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default PartyForm;
