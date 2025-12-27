import React from "react";
import { Form, Input, Button } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  AIRTABLE_WRITE_ENDPOINTS,
  createAirtableRecord,
} from "@/services/airtable-write.service";
import SvgIcon from "@/based/SvgIcon";
import FormResultModal from "@/components/FormResultModal";

const { TextArea } = Input;

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const [form] = Form.useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Get only digits from phone number
  const getPhoneDigits = (value: string): string => {
    return value ? value.replace(/\D/g, "") : "";
  };

  // Phone validation - check min 9 and max 10 digits
  const validatePhone = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your phone"));
    }
    const digits = getPhoneDigits(value);
    if (digits.length < 9) {
      return Promise.reject(
        new Error("Phone number must have at least 9 digits")
      );
    }
    if (digits.length > 10) {
      return Promise.reject(
        new Error("Phone number must have at most 10 digits")
      );
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
      };

      await createAirtableRecord(
        AIRTABLE_WRITE_ENDPOINTS.guest_contact,
        airtableFields
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

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="[&_.ant-form-item]:mb-4 [&_.ant-form-item]:lg:mb-6"
    >
      <Form.Item
        name="name"
        label={
          <span
            className={clsx(
              "text-[#10182A] font-prata",
              responsiveFontSizeArray(12, 14)
            )}
          >
            Name
          </span>
        }
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <SvgIcon
              src="/assets/svgs/user.svg"
              ariaLabel="user"
              width={24}
              height={24}
              className="size-[24px] shrink-0 text-[#9E7B6A]"
            />
          </div>
          <Input
            type="text"
            placeholder="Your name in here"
            className={clsx(
              "pl-10 pr-4 py-3 rounded-xl border !border-[#C19A6B] h-[50px] lg:h-[72px]",
              "bg-[#D5B994]/40 placeholder:text-[#9E7B6A]",
              responsiveFontSizeArray(14, 16)
            )}
          />
        </div>
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6">
        <Form.Item
          name="phone"
          label={
            <span
              className={clsx(
                "text-[#10182A] font-prata",
                responsiveFontSizeArray(12, 14)
              )}
            >
              Your phone
            </span>
          }
          rules={[{ validator: validatePhone }]}
        >
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <SvgIcon
                src="/assets/svgs/phone.svg"
                ariaLabel="phone"
                width={24}
                height={24}
                className="size-[24px] shrink-0 text-[#9E7B6A]"
              />
            </div>
            <Input
              type="tel"
              placeholder="Your phone in here"
              className={clsx(
                "pl-10 pr-4 py-3 rounded-xl border !border-[#C19A6B] h-[50px] lg:h-[72px]",
                "bg-white text-black",
                responsiveFontSizeArray(14, 16)
              )}
            />
          </div>
        </Form.Item>
        <Form.Item
          name="email"
          label={
            <span
              className={clsx(
                "text-[#10182A] font-prata",
                responsiveFontSizeArray(12, 14)
              )}
            >
              Your Email
            </span>
          }
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <SvgIcon
                src="/assets/svgs/email.svg"
                ariaLabel="email"
                width={24}
                height={24}
                className="size-[24px] shrink-0 text-[#9E7B6A]"
              />
            </div>
            <Input
              type="email"
              placeholder="Your Email in here"
              className={clsx(
                "pl-10 pr-4 py-3 rounded-xl border !border-[#C19A6B] h-[50px] lg:h-[72px]",
                "bg-white text-black",
                responsiveFontSizeArray(14, 16)
              )}
            />
          </div>
        </Form.Item>
      </div>

      <Form.Item
        name="message"
        label={
          <span
            className={clsx(
              "text-[#10182A] font-prata",
              responsiveFontSizeArray(12, 14)
            )}
          >
            Your messenger
          </span>
        }
      >
        <div className="relative">
          <div className="absolute left-3 top-4 z-10">
            <SvgIcon
              src="/assets/svgs/chat.svg"
              ariaLabel="chat"
              width={24}
              height={24}
              className="size-[24px] shrink-0 text-[#9E7B6A]"
            />
          </div>
          <TextArea
            placeholder="Your information in here"
            rows={5}
            className={clsx(
              "pl-10 pr-4 py-3 rounded-xl border !border-[#C19A6B] h-[50px] lg:h-[72px]",
              "bg-white text-black",
              responsiveFontSizeArray(14, 16)
            )}
          />
        </div>
      </Form.Item>

      <Form.Item className="mb-0">
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          className={clsx(
            "w-full rounded-full !bg-[#9E7B6A] text-white h-[54px] lg:h-[70px]",
            "font-bold hover:opacity-85",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            responsiveFontSizeArray(16, 18)
          )}
        >
          {isSubmitting ? "SENDING..." : "SEND"}
        </Button>
      </Form.Item>
      <FormResultModal
        open={isModalOpen}
        isSuccess={isSuccess}
        onClose={handleCloseModal}
      />
    </Form>
  );
};

export default ContactForm;
