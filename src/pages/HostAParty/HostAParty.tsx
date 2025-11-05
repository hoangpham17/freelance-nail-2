import React, { useState } from "react";

const HostAParty: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    partySize: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent-cream via-white to-primary/5 overflow-hidden">
        {/* Elegant decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-24 h-24 border-4 border-primary rounded-full"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-10 w-20 h-20 border-4 border-primary/30 transform rotate-45"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <p className="text-primary text-lg font-medium tracking-wider mb-4">
                  CELEBRATE IN STYLE
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                  Host a Party{" "}
                  <span className="block text-primary mt-2">
                    at Madison Nail Lounge!
                  </span>
                </h1>
              </div>

              <div className="space-y-6 text-secondary-light text-lg leading-relaxed">
                <p>
                  Our Nail Lounge is the perfect setting for bridal showers,
                  birthdays, bachelorette parties, corporate events, and special
                  gatherings.
                </p>
                <p>
                  With a beautiful space and a dedicated team, we provide a
                  seamless, memorable experience for you and your guests.
                </p>
                <p>
                  Contact us to learn more or fill out our inquiry form. Your
                  ideal destination for fun, relaxation, and flawless nail
                  services awaits!
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+16087201011"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  CALL US
                </a>
                <a
                  href="mailto:contact@madisonnaillounge.com"
                  className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 font-medium hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  EMAIL US
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1000&fit=crop"
                  alt="Party celebration"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/800x1000/C9A05C/ffffff?text=Party+Celebration";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-4 border-primary rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-full -z-10 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-24 px-5 bg-gradient-to-br from-secondary via-secondary-dark to-secondary overflow-hidden">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20px 20px, white 2px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Inquiry Form
            </h2>
            <p className="text-xl text-white/80">
              Fill out the form below and we'll get back to you shortly
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Your Name */}
              <div className="space-y-3">
                <label
                  htmlFor="name"
                  className="block text-primary text-lg font-medium tracking-wide"
                >
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-primary focus:bg-white/15 transition-all duration-300 placeholder-white/40 text-lg"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="block text-primary text-lg font-medium tracking-wide"
                  >
                    Your Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-primary focus:bg-white/15 transition-all duration-300 placeholder-white/40 text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label
                    htmlFor="phone"
                    className="block text-primary text-lg font-medium tracking-wide"
                  >
                    Your Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(888) 888-8888"
                    required
                    className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-primary focus:bg-white/15 transition-all duration-300 placeholder-white/40 text-lg"
                  />
                </div>
              </div>

              {/* Date and Party Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label
                    htmlFor="date"
                    className="block text-primary text-lg font-medium tracking-wide"
                  >
                    Preferred Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-primary focus:bg-white/15 transition-all duration-300 placeholder-white/40 text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label
                    htmlFor="partySize"
                    className="block text-primary text-lg font-medium tracking-wide"
                  >
                    Party Size <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    id="partySize"
                    name="partySize"
                    value={formData.partySize}
                    onChange={handleChange}
                    placeholder="Number of guests"
                    required
                    min="1"
                    className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-primary focus:bg-white/15 transition-all duration-300 placeholder-white/40 text-lg"
                  />
                </div>
              </div>

              {/* Additional Message */}
              <div className="space-y-3">
                <label
                  htmlFor="message"
                  className="block text-primary text-lg font-medium tracking-wide"
                >
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event, special requests, or questions..."
                  rows={6}
                  className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-primary focus:bg-white/15 transition-all duration-300 placeholder-white/40 resize-none text-lg leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white text-xl font-bold py-6 rounded-lg transition-all duration-300 shadow-2xl hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  SEND INQUIRY
                </button>
              </div>

              <p className="text-center text-white/60 text-sm">
                We'll respond to your inquiry within 24 hours
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HostAParty;
