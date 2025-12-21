import React from "react";
import { PartyFormData } from "../../types";
import { Wrapper } from "@/based/components/Wrapper";
import { Form, Input, Button, DatePicker, message as antdMessage } from "antd";
import dayjs, { Dayjs } from "dayjs";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  AIRTABLE_WRITE_ENDPOINTS,
  createAirtableRecord,
} from "@/services/airtable-write.service";
import SvgIcon from "@/based/SvgIcon";

const { TextArea } = Input;

const PartyForm: React.FC = () => {
  const [form] = Form.useForm<PartyFormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Get today's date and max date for DatePicker
  const today = dayjs();
  const maxDate = dayjs("2100-12-31");

  // Disable dates before today and after max date
  const disabledDate = (current: Dayjs | null) => {
    if (!current) return false;
    return current.isBefore(today, "day") || current.isAfter(maxDate, "day");
  };

  const handleSubmit = async (values: PartyFormData) => {
    setIsSubmitting(true);
    try {
      // Map form data to Airtable fields
      const airtableFields = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        party_size: values.partySize ? parseInt(values.partySize, 10) : 0,
        message: values.message || "",
        date: values.date || "",
      };

      await createAirtableRecord(
        AIRTABLE_WRITE_ENDPOINTS.host_a_party,
        airtableFields
      );

      antdMessage.success(
        "Your party inquiry has been submitted successfully!"
      );
      form.resetFields();
    } catch (error) {
      console.error("Error submitting party inquiry:", error);
      antdMessage.error(
        "Failed to submit your inquiry. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative">
      <Wrapper>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:p-6">
          <div className="w-2/3">
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
                      "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A]",
                      "bg-[#D5B994]/40 placeholder:text-[#9E7B6A]",
                      responsiveFontSizeArray(14, 16)
                    )}
                  />
                </div>
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
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
                  rules={[
                    { required: true, message: "Please enter your phone" },
                  ]}
                >
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <SvgIcon
                        src="/assets/svgs/phone-2.svg"
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
                        "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A]",
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
                        "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A]",
                        responsiveFontSizeArray(14, 16)
                      )}
                    />
                  </div>
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <Form.Item
                  name="date"
                  label={
                    <span
                      className={clsx(
                        "text-[#10182A] font-prata",
                        responsiveFontSizeArray(12, 14)
                      )}
                    >
                      Date
                    </span>
                  }
                  rules={[{ required: true, message: "Please select a date" }]}
                  getValueFromEvent={(value: Dayjs | null) => {
                    return value ? value.format("YYYY-MM-DD") : "";
                  }}
                  normalize={(value) => {
                    if (typeof value === "string" && value) {
                      return dayjs(value);
                    }
                    return value;
                  }}
                >
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                      <SvgIcon
                        src="/assets/svgs/calendar.svg"
                        ariaLabel="calendar"
                        width={24}
                        height={24}
                        className="size-[24px] shrink-0 text-[#9E7B6A]"
                      />
                    </div>
                    <DatePicker
                      disabledDate={disabledDate}
                      format="MM/DD/YYYY"
                      className={clsx(
                        "w-full pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A]",
                        "[&_.ant-picker-suffix]:hidden",
                        responsiveFontSizeArray(14, 16)
                      )}
                    />
                  </div>
                </Form.Item>

                <Form.Item
                  name="partySize"
                  label={
                    <span
                      className={clsx(
                        "text-[#10182A] font-prata",
                        responsiveFontSizeArray(12, 14)
                      )}
                    >
                      Party Size
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter party size" },
                    {
                      pattern: /^[1-9]\d*$/,
                      message: "Party size must be at least 1",
                    },
                  ]}
                >
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <SvgIcon
                        src="/assets/svgs/group-user.svg"
                        ariaLabel="group-user"
                        width={24}
                        height={24}
                        className="size-[24px] shrink-0 text-[#9E7B6A]"
                      />
                    </div>
                    <Input
                      type="number"
                      placeholder="Your party size in here"
                      min="1"
                      className={clsx(
                        "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A]",
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
                      "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A]",
                      responsiveFontSizeArray(14, 16)
                    )}
                  />
                </div>
              </Form.Item>

              <Form.Item className="pt-4 mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className={clsx(
                    "w-full py-3 lg:py-4 rounded-xl !bg-[#8B7355] text-white border-none",
                    "font-semibold h-auto",
                    "hover:bg-[#A67C52] transition-colors",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    responsiveFontSizeArray(16, 18)
                  )}
                >
                  {isSubmitting ? "SENDING..." : "SEND"}
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="w-1/3 lg:sticky lg:top-20">
            <div className="relative w-full h-64 lg:h-auto rounded-2xl overflow-hidden">
              <img
                src="/assets/images/Host-A-Party/host-a-party.png"
                alt="Nail polish bottles"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/800/600";
                }}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default PartyForm;
