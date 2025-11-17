import React, { useState } from "react";
import "./style.css";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

type FieldState = "default" | "error" | "done";

interface ContactFormProps {
  onSubmitComplete: (success: boolean) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmitComplete }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) =>
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Please enter your name";
      case "email":
        return validateEmail(value) ? "" : "Please enter a valid email address";
      case "phone":
        return validatePhone(value) ? "" : "Please enter a valid phone number";
      case "message":
        return value.trim() ? "" : "Please enter your message";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    setFieldStates((prev) => ({
      ...prev,
      [name]: error ? "error" : value ? "done" : "default",
    }));
  };

  const handleClear = (fieldName: keyof FormData) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    setFieldStates((prev) => ({ ...prev, [fieldName]: "default" }));
  };

  const renderError = (field: keyof FormData) =>
    fieldStates[field] === "error" && errors[field] ? (
      <p className="error-text" data-error-text>
        {errors[field]}
      </p>
    ) : (
      <p className="error-text" data-error-text></p>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
        setFieldStates((prev) => ({ ...prev, [key]: "error" }));
      } else {
        setFieldStates((prev) => ({
          ...prev,
          [key]: formData[key] ? "done" : "default",
        }));
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://dev-api.madisonnaillounge.com/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setFieldStates({});
        setErrors({});
        onSubmitComplete(true);
      } else {
        onSubmitComplete(false);
      }
    } catch (error) {
      console.error("Form submission error", error);
      onSubmitComplete(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form id="form-contact" onSubmit={handleSubmit}>
        <div className="form-inner">
          <div className="row-custom">
            <div className="form-group" data-input-field>
              <label className="label-form gold">Your name</label>
              <div className={`input-wrapper ${fieldStates.name ?? ""}`.trim()}>
                <input
                  className="input-field"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name in here"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  data-input
                />
                {renderError("name")}
                <img
                  src="/assets/images/Icons/icon-x-red.svg"
                  alt="Clear"
                  className="icon icon-clear"
                  data-clear-text
                  onClick={() => handleClear("name")}
                />
                <img
                  src="/assets/images/Icons/icon-check-gray.svg"
                  alt="Done"
                  className="icon icon-done"
                />
              </div>
            </div>
          </div>

          <div className="row-custom two-column">
            <div className="form-group" data-input-field>
              <label className="label-form gold">Phone number</label>
              <div
                className={`input-wrapper ${fieldStates.phone ?? ""}`.trim()}
              >
                <input
                  className="input-field"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone number in here"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  data-input
                />
                {renderError("phone")}
                <img
                  src="/assets/images/Icons/icon-x-red.svg"
                  alt="Clear"
                  className="icon icon-clear"
                  data-clear-text
                  onClick={() => handleClear("phone")}
                />
                <img
                  src="/assets/images/Icons/icon-check-gray.svg"
                  alt="Done"
                  className="icon icon-done"
                />
              </div>
            </div>

            <div className="form-group" data-input-field>
              <label className="label-form gold">Email address</label>
              <div
                className={`input-wrapper ${fieldStates.email ?? ""}`.trim()}
              >
                <input
                  className="input-field"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address in here"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  data-input
                />
                {renderError("email")}
                <img
                  src="/assets/images/Icons/icon-x-red.svg"
                  alt="Clear"
                  className="icon icon-clear"
                  data-clear-text
                  onClick={() => handleClear("email")}
                />
                <img
                  src="/assets/images/Icons/icon-check-gray.svg"
                  alt="Done"
                  className="icon icon-done"
                />
              </div>
            </div>
          </div>

          <div className="row-custom">
            <div className="form-group" data-input-field>
              <label className="label-form gold">Message</label>
              <div
                className={`input-wrapper text-area-wrapper ${
                  fieldStates.message ?? ""
                }`.trim()}
              >
                <textarea
                  className="input-field input-textarea"
                  id="your-messenger"
                  name="message"
                  rows={1}
                  placeholder="Your message in here"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  data-input
                ></textarea>
                {renderError("message")}
                <img
                  src="/assets/images/Icons/icon-x-red.svg"
                  alt="Clear"
                  className="icon icon-clear"
                  data-clear-text
                  onClick={() => handleClear("message")}
                />
                <img
                  src="/assets/images/Icons/icon-check-gray.svg"
                  alt="Done"
                  className="icon icon-done"
                />
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value={isSubmitting ? "SENDING" : "SEND"}
          className="btn-submit"
          data-submit-form
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ContactForm;
