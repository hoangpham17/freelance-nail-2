import React from "react";
import { PartyFormData } from "../../types";
import { Wrapper } from "@/based/components/Wrapper";
import { Form, Input, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  AIRTABLE_WRITE_ENDPOINTS,
  createAirtableRecord,
} from "@/services/airtable-write.service";
import SvgIcon from "@/based/SvgIcon";
import FormResultModal from "@/components/FormResultModal";

const { TextArea } = Input;

const PartyForm: React.FC = () => {
  const [form] = Form.useForm<PartyFormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  console.log(form.getFieldsValue());
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
        date: values.date ? values.date.format("YYYY-MM-DD") : "",
      };

      await createAirtableRecord(
        AIRTABLE_WRITE_ENDPOINTS.host_a_party,
        airtableFields
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

  return (
    <section className="relative">
      <Wrapper>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:p-6">
          <div className="lg:w-2/3">
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
                      responsiveFontSizeArray(18, 24)
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
                      "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A] h-[50px] lg:h-[72px] font-light text-[20px]",
                      "bg-[#D5B994]/40 placeholder:text-[#9E7B6A]"
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
                        responsiveFontSizeArray(18, 24)
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
                        "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A] h-[50px] lg:h-[72px] font-light text-[20px]"
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
                        responsiveFontSizeArray(18, 24)
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
                        "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A] h-[50px] lg:h-[72px] font-light text-[20px]"
                      )}
                    />
                  </div>
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6">
                <Form.Item
                  name="date"
                  label={
                    <span
                      className={clsx(
                        "text-[#10182A] font-prata",
                        responsiveFontSizeArray(18, 24)
                      )}
                    >
                      Date
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select a date",
                    },
                  ]}
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
                      format="MM/DD/YYYY"
                      className={clsx(
                        "w-full pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A] h-[50px] lg:h-[72px]",
                        "[&_.ant-picker-input>input]:text-[20px] [&_.ant-picker-input>input]:font-light"
                      )}
                      suffixIcon={null}
                      minDate={dayjs()}
                      maxDate={dayjs("2100-12-31")}
                      onChange={(date) => {
                        form.setFieldValue("date", date);
                      }}
                    />
                  </div>
                </Form.Item>

                <Form.Item
                  name="partySize"
                  label={
                    <span
                      className={clsx(
                        "text-[#10182A] font-prata",
                        responsiveFontSizeArray(18, 24)
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
                        "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A] h-[50px] lg:h-[72px] font-light text-[20px]"
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
                      responsiveFontSizeArray(18, 24)
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
                      "pl-10 pr-4 py-3 rounded-xl border !border-[#9E7B6A] h-[50px] lg:h-[72px] font-light text-[20px]"
                    )}
                  />
                </div>
              </Form.Item>

              <Form.Item className="!mb-0">
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
            </Form>
          </div>

          <div className="lg:w-1/3">
            <div className="relative">
              <img
                src="/assets/images/Host-A-Party/host-a-party.png"
                alt="Nail polish bottles"
                className="max-w-[380px] mx-auto lg:max-w-full w-full lg:w-auto h-[344px] lg:h-full object-cover max-h-[560px] object-top"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/800/600";
                }}
              />
            </div>
          </div>
        </div>
      </Wrapper>
      <FormResultModal
        open={isModalOpen}
        isSuccess={isSuccess}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default PartyForm;
