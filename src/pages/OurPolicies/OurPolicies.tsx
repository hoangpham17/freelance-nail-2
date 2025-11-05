import React from "react";

const OurPolicies: React.FC = () => {
  const policies = [
    {
      title: "Service Guarantee",
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      content:
        "We guarantee our services, excluding regular nail polish, for a period of 7 days. Repairs must match the original service color, and customers could help provide the name of the staff member who performed the original service.",
    },
    {
      title: "Appointment Policy",
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      content:
        "If you arrive more than 10 minutes late, we reserve the right to serve the next customer. You may wait for the next available nail technician.",
    },
    {
      title: "Customer Health and Special Needs",
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      content:
        "Please inform our staff of any medical conditions, allergies, or special needs that may affect your service.",
    },
    {
      title: "Safety and Responsibility",
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      content:
        "We are NOT responsible for lost or stolen items. Please keep all belongings with you. For the safety of all customers, children must remain with their parents. We are not liable for any injuries that may occur.",
    },
    {
      title: "Pricing and Accepted Payment Methods",
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      content:
        "Prices are subject to change without prior notice. We do NOT accept checks for any transactions.",
    },
    {
      title: "Refunds and Exchanges",
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      content: "We do NOT offer refunds or exchanges on any services rendered.",
    },
    {
      title: "Gift Card Policy",
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      content:
        "Please note that gift cards must be purchased directly from Madison Nail Lounge. We do NOT accept gift cards from third-party vendors due to fraudulent credit cards and online activity. Gift cards should be treated like cash and presented at the time of service. They are NOT redeemable or refundable for cash or credit. We are NOT liable for lost, damaged, or stolen gift cards.",
    },
    {
      title: "Toenail Cutting Policy",
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      content:
        "We do NOT provide services for ingrown toenails and recommend consulting a healthcare professional for any related concerns. Please note that we are not liable for any issues arising from ingrown toenails. If you experience any discomfort during your service, kindly inform our staff.",
    },
    {
      title: "Right to Refuse Service",
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      ),
      content: "We reserve the right to refuse service to anyone.",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-accent to-white">
      {/* Header Section */}
      <section className="relative py-20 px-5 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Title */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-secondary mb-4">
                Policies of our
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary">
                Nail Lounge
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                  {policy.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-secondary text-center mb-4">
                  {policy.title}
                </h3>

                {/* Content */}
                <p className="text-secondary-light text-sm leading-relaxed text-center">
                  {policy.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 px-5 bg-gradient-to-r from-secondary via-secondary-dark to-secondary">
        <div className="max-w-5xl mx-auto text-center">
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-serif italic text-white leading-relaxed">
              Thank you for your understanding and support of our business.
            </p>
            <p className="text-xl md:text-2xl font-sans text-white/90 leading-relaxed">
              If you have any questions or concerns, please don't hesitate to
              contact us.
            </p>
          </div>

          {/* Contact Button */}
          <div className="mt-10">
            <button className="bg-primary text-white px-12 py-4 rounded-full text-lg font-semibold hover:-translate-y-1 hover:shadow-2xl hover:bg-primary-dark transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Wave */}
      <div className="h-20 bg-gradient-to-t from-secondary/5 to-transparent"></div>
    </div>
  );
};

export default OurPolicies;
