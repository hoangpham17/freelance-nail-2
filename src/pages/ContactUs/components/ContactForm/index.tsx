import React, { useState } from "react";
import { Input, message as antdMessage } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  AIRTABLE_WRITE_ENDPOINTS,
  createAirtableRecord,
} from "@/services/airtable-write.service";

const { TextArea } = Input;

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const defaultData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(defaultData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map form data to Airtable fields
      const airtableFields = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message || "",
      };

      await createAirtableRecord(
        AIRTABLE_WRITE_ENDPOINTS.guest_contact,
        airtableFields
      );

      antdMessage.success(
        "Your message has been submitted successfully! We'll contact you soon."
      );
      setFormData(defaultData);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      antdMessage.error(
        "Failed to submit your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
      {/* Name Field - Beige background, dark placeholder */}
      <div className="flex flex-col gap-2">
        <label
          className={clsx(
            "text-[#452917] font-medium uppercase tracking-wide font-prata",
            responsiveFontSizeArray(12, 14)
          )}
        >
          Name
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <i className="bi bi-person text-[#494747] text-lg"></i>
          </div>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name in here"
            required
            className={clsx(
              "pl-10 pr-4 py-3 rounded-xl border border-[#C19A6B]",
              "bg-[#EDE5DE] text-[#494747]",
              "focus:border-[#C19A6B] focus:shadow-none",
              "[&::placeholder]:text-[#494747]",
              responsiveFontSizeArray(14, 16)
            )}
          />
        </div>
      </div>

      {/* Phone and Email - 2 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Phone Field - White background, light placeholder */}
        <div className="flex flex-col gap-2">
          <label
            className={clsx(
              "text-[#452917] font-medium uppercase tracking-wide font-prata",
              responsiveFontSizeArray(12, 14)
            )}
          >
            Your phone
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <i className="bi bi-telephone text-[#494747] text-lg"></i>
            </div>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone in here"
              required
              className={clsx(
                "pl-10 pr-4 py-3 rounded-xl border border-[#C19A6B]",
                "bg-white text-[#494747]",
                "focus:border-[#C19A6B] focus:shadow-none",
                "[&::placeholder]:text-[#D3D3D3]",
                responsiveFontSizeArray(14, 16)
              )}
            />
          </div>
        </div>

        {/* Email Field - White background, light placeholder */}
        <div className="flex flex-col gap-2">
          <label
            className={clsx(
              "text-[#452917] font-medium uppercase tracking-wide font-prata",
              responsiveFontSizeArray(12, 14)
            )}
          >
            Your Email
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <i className="bi bi-envelope text-[#494747] text-lg"></i>
            </div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email in here"
              required
              className={clsx(
                "pl-10 pr-4 py-3 rounded-xl border border-[#C19A6B]",
                "bg-white text-[#494747]",
                "focus:border-[#C19A6B] focus:shadow-none",
                "[&::placeholder]:text-[#D3D3D3]",
                responsiveFontSizeArray(14, 16)
              )}
            />
          </div>
        </div>
      </div>

      {/* Message Field - White background, light placeholder */}
      <div className="flex flex-col gap-2">
        <label
          className={clsx(
            "text-[#452917] font-medium uppercase tracking-wide font-prata",
            responsiveFontSizeArray(12, 14)
          )}
        >
          Your messenger
        </label>
        <div className="relative">
          <div className="absolute left-3 top-4 z-10">
            <i className="bi bi-chat-dots text-[#494747] text-lg"></i>
          </div>
          <TextArea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your information in here"
            rows={5}
            required
            className={clsx(
              "pl-10 pr-4 py-3 rounded-xl border border-[#C19A6B]",
              "bg-white text-[#494747]",
              "focus:border-[#C19A6B] focus:shadow-none",
              "[&::placeholder]:text-[#D3D3D3]",
              responsiveFontSizeArray(14, 16)
            )}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            "w-full py-3 lg:py-4 rounded-xl bg-[#8B7355] text-white",
            "font-semibold uppercase tracking-wider",
            "hover:bg-[#A67C52] transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            responsiveFontSizeArray(16, 18)
          )}
        >
          {isSubmitting ? "SENDING..." : "SEND"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
