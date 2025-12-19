import React, { useState } from "react";
import { PartyFormData } from "../../types";
import { Wrapper } from "@/based/components/Wrapper";
import { Input, message as antdMessage } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  createAirtableRecord,
  AIRTABLE_ENDPOINTS,
} from "@/services/airtable.service";

const { TextArea } = Input;

const defaultData: PartyFormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  partySize: "",
  message: "",
};

const PartyForm: React.FC = () => {
  const [formData, setFormData] = useState<PartyFormData>(defaultData);
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
        party_size: formData.partySize ? parseInt(formData.partySize, 10) : 0,
        message: formData.message || "",
        date: formData.date || "",
      };

      await createAirtableRecord(
        AIRTABLE_ENDPOINTS.host_a_party,
        airtableFields
      );

      antdMessage.success(
        "Your party inquiry has been submitted successfully!"
      );
      setFormData(defaultData);
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
    <section className="relative w-full bg-white py-8 lg:py-12">
      <Wrapper>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Form */}
            <div className="w-full">
              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label
                    className={clsx(
                      "text-[#452917] font-medium uppercase tracking-wide",
                      responsiveFontSizeArray(12, 14)
                    )}
                  >
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <i className="bi bi-person text-[#8B7355] text-lg"></i>
                    </div>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name in here"
                      required
                      className={clsx(
                        "pl-10 pr-4 py-3 rounded-xl border border-[#8B7355]/30",
                        "bg-[#F5F0E8] text-[#452917]",
                        "focus:border-[#8B7355] focus:shadow-none",
                        responsiveFontSizeArray(14, 16)
                      )}
                    />
                  </div>
                </div>

                {/* Phone and Email - 2 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {/* Phone Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className={clsx(
                        "text-[#452917] font-medium uppercase tracking-wide",
                        responsiveFontSizeArray(12, 14)
                      )}
                    >
                      Your phone
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <i className="bi bi-telephone text-[#8B7355] text-lg"></i>
                      </div>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone in here"
                        required
                        className={clsx(
                          "pl-10 pr-4 py-3 rounded-xl border border-[#8B7355]/30",
                          "bg-white text-[#452917]",
                          "focus:border-[#8B7355] focus:shadow-none",
                          responsiveFontSizeArray(14, 16)
                        )}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className={clsx(
                        "text-[#452917] font-medium uppercase tracking-wide",
                        responsiveFontSizeArray(12, 14)
                      )}
                    >
                      Your Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <i className="bi bi-envelope text-[#8B7355] text-lg"></i>
                      </div>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email in here"
                        required
                        className={clsx(
                          "pl-10 pr-4 py-3 rounded-xl border border-[#8B7355]/30",
                          "bg-white text-[#452917]",
                          "focus:border-[#8B7355] focus:shadow-none",
                          responsiveFontSizeArray(14, 16)
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Date and Party Size - 2 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {/* Date Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className={clsx(
                        "text-[#452917] font-medium uppercase tracking-wide",
                        responsiveFontSizeArray(12, 14)
                      )}
                    >
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <i className="bi bi-calendar text-[#8B7355] text-lg"></i>
                      </div>
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className={clsx(
                          "pl-10 pr-4 py-3 rounded-xl border border-[#8B7355]/30",
                          "bg-white text-[#452917]",
                          "focus:border-[#8B7355] focus:shadow-none",
                          responsiveFontSizeArray(14, 16)
                        )}
                      />
                    </div>
                  </div>

                  {/* Party Size Field */}
                  <div className="flex flex-col gap-2">
                    <label
                      className={clsx(
                        "text-[#452917] font-medium uppercase tracking-wide",
                        responsiveFontSizeArray(12, 14)
                      )}
                    >
                      Party Size
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <i className="bi bi-people text-[#8B7355] text-lg"></i>
                      </div>
                      <Input
                        type="number"
                        name="partySize"
                        value={formData.partySize}
                        onChange={handleChange}
                        placeholder="Your party size in here"
                        min="1"
                        required
                        className={clsx(
                          "pl-10 pr-4 py-3 rounded-xl border border-[#8B7355]/30",
                          "bg-white text-[#452917]",
                          "focus:border-[#8B7355] focus:shadow-none",
                          responsiveFontSizeArray(14, 16)
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-2">
                  <label
                    className={clsx(
                      "text-[#452917] font-medium uppercase tracking-wide",
                      responsiveFontSizeArray(12, 14)
                    )}
                  >
                    Your messenger
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-4 z-10">
                      <i className="bi bi-chat-dots text-[#8B7355] text-lg"></i>
                    </div>
                    <TextArea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your information in here"
                      rows={5}
                      className={clsx(
                        "pl-10 pr-4 py-3 rounded-xl border border-[#8B7355]/30",
                        "bg-white text-[#452917]",
                        "focus:border-[#8B7355] focus:shadow-none",
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
            </div>

            {/* Right Side - Decorative Image */}
            <div className="w-full lg:sticky lg:top-20">
              <div className="relative w-full h-64 lg:h-[500px] rounded-2xl overflow-hidden">
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
        </div>
      </Wrapper>
    </section>
  );
};

export default PartyForm;
