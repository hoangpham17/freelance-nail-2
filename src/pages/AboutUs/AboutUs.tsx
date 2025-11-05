import React from "react";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";

interface AboutUsData {
  description: string;
  title?: string;
  titleText?: string;
  icon?: string;
  titleImage?: string;
  backgroundColor?: string;
}

const AboutUs: React.FC = () => {
  const { data, loading } = useAirtable<AboutUsData>(
    AIRTABLE_ENDPOINTS.aboutUs
  );

  // Fallback data if Airtable fails or is loading
  const fallbackItems = [
    {
      icon: "/assets/images/Icons/icon-about-us-1.svg",
      titleImage: "/assets/images/Icons/icon-about-us-our-yellow.svg",
      titleText: "Our Team",
      description:
        "Our team of experienced technicians is devoted to delivering the highest quality treatments, utilizing the finest products and equipment available.",
      backgroundColor: "rgba(255, 238, 214, 0.8)",
    },
    {
      icon: "/assets/images/Icons/icon-about-us-2.svg",
      titleImage: "/assets/images/Icons/icon-about-us-our-blue.svg",
      titleText: "Our Highly Skilled",
      description:
        "Our highly skilled technicians have undergone advanced training and consistently stay up to date with the latest trends and techniques in nail care. Whether you are seeking a simple, classic manicure or an intricate nail design, our technicians will skillfully try to bring your vision to life.",
      backgroundColor: "rgba(243, 249, 255, 0.8)",
    },
    {
      icon: "/assets/images/Icons/icon-about-us-3.svg",
      titleImage: "/assets/images/Icons/icon-about-us-we.svg",
      titleText: "We Are",
      description:
        "We are more than just a nail salon. We are an exceptional oasis of beauty, relaxation, and top-notch service. Our mission is to provide our valued clients with an outstanding service that leaves them feeling pampered, rejuvenated, and confident.",
      backgroundColor: "rgba(247, 247, 247, 1)",
    },
  ];

  // Use Airtable data if available, otherwise use fallback
  const aboutUsItems = data && data.length > 0 ? data : fallbackItems;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center py-20 px-5 bg-gradient-to-r from-primary to-primary-dark text-white mb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl opacity-95">
            Your trusted destination for luxury nail care
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      )}

      {/* About Us Block */}
      {!loading && (
        <section className="py-12 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutUsItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <img
                      src={item.icon}
                      alt={`${item.titleText} Icon`}
                      className="w-20 h-20 object-contain"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    {/* Title Image */}
                    <div className="flex justify-center">
                      <img
                        src={item.titleImage}
                        alt={`${item.titleText} Title`}
                        className="h-10 object-contain"
                        onError={(e) => {
                          // Fallback to text if image doesn't exist
                          e.currentTarget.style.display = "none";
                          const textElement =
                            e.currentTarget.nextElementSibling;
                          if (textElement) {
                            textElement.classList.remove("hidden");
                          }
                        }}
                      />
                      <h3 className="hidden text-2xl font-bold text-gray-800">
                        {item.titleText}
                      </h3>
                    </div>

                    {/* Text */}
                    <p className="text-gray-700 leading-relaxed text-center">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutUs;
