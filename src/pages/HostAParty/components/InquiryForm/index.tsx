import React, { useState } from "react";
import { PartyFormData } from "../../types";
import "./style.css";

const defaultData: PartyFormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  partySize: "",
  message: "",
};

const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<PartyFormData>(defaultData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Party inquiry submitted:", formData);
    setFormData(defaultData);
  };

  return (
    <section className="party-form">
      <div className="party-form__pattern" />
      <div className="party-form__container">
        <div className="party-form__heading">
          <h2>Inquiry Form</h2>
          <p>Fill out the form below and we'll get back to you shortly</p>
        </div>
        <div className="party-form__card">
          <form onSubmit={handleSubmit} className="party-form__grid">
            <label className="party-form__field">
              <span>Your Name *</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </label>
            <label className="party-form__field">
              <span>Your Email *</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </label>
            <label className="party-form__field">
              <span>Your Phone Number *</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(888) 888-8888"
                required
              />
            </label>
            <label className="party-form__field">
              <span>Preferred Date *</span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
            <label className="party-form__field">
              <span>Party Size *</span>
              <input
                type="number"
                name="partySize"
                value={formData.partySize}
                onChange={handleChange}
                placeholder="Number of guests"
                min="1"
                required
              />
            </label>
            <label className="party-form__field party-form__field--full">
              <span>Additional Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your event, special requests, or questions..."
                rows={5}
              />
            </label>
            <div className="party-form__actions">
              <button type="submit">Send Inquiry</button>
              <p>We'll respond to your inquiry within 24 hours.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
