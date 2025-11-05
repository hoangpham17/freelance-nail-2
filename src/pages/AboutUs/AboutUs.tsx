import React from "react";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";

/**
 * Airtable Attachment Type
 */
interface AirtableAttachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  thumbnails?: {
    small?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    full?: { url: string; width: number; height: number };
  };
}

/**
 * About Us Data Structure from Airtable
 * Contains description, icon, logo, and backgroundColor fields
 */
interface AboutUsData {
  id?: string;
  description: string;
  icon?: AirtableAttachment[];
  logo?: AirtableAttachment[];
  backgroundColor?: string;
}

// Fallback card styles if backgroundColor is not provided
const FALLBACK_COLORS = [
  "bg-gradient-to-br from-amber-50 to-orange-50",
  "bg-gradient-to-br from-blue-50 to-cyan-50",
  "bg-gradient-to-br from-purple-50 to-pink-50",
];

const AboutUs: React.FC = () => {
  const { data, loading, error } = useAirtable<AboutUsData>(
    AIRTABLE_ENDPOINTS.aboutUs
  );

  return (
    <div className="w-full bg-gradient-to-b from-accent to-white">
      {/* Header */}
      <div className="text-center py-12 sm:py-16 md:py-20 px-4 sm:px-5 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 md:mb-4">
            About Us
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-white mx-auto mb-4 md:mb-6 opacity-50"></div>
          <p className="text-base sm:text-lg md:text-xl opacity-95 px-4">
            Your trusted destination for luxury nail care
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-5">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
              <p className="text-secondary-light">Loading content...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-2xl font-serif font-bold text-red-800 mb-3">
                  Unable to Load Content
                </h3>
                <p className="text-red-600 mb-4">
                  {error.message || "Please try again later."}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && (!data || data.length === 0) && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">No content available yet.</p>
            </div>
          )}

          {/* Data Cards */}
          {!loading && !error && data && data.length > 0 && (
            <div className="space-y-6 sm:space-y-8">
              {data.map((item, index) => {
                const iconUrl = item.icon?.[0]?.url;
                const logoUrl = item.logo?.[0]?.url;
                const bgColor = item.backgroundColor;

                return (
                  <div
                    key={item.id || index}
                    className={`
                      ${
                        !bgColor
                          ? FALLBACK_COLORS[index % FALLBACK_COLORS.length]
                          : ""
                      }
                      rounded-2xl md:rounded-3xl 
                      p-6 sm:p-8 md:p-10 lg:p-12
                      shadow-lg hover:shadow-2xl 
                      transition-all duration-300 
                      hover:-translate-y-1
                      border border-gray-100
                      relative overflow-hidden
                    `}
                    style={bgColor ? { backgroundColor: bgColor } : undefined}
                  >
                    {/* Content Container */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 relative z-10">
                      {/* Icon */}
                      {iconUrl && (
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                            <img
                              src={iconUrl}
                              alt="Icon"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 relative w-full">
                        {/* Background Logo */}
                        {logoUrl && (
                          <div className="absolute -top-2 md:-top-4 left-0 right-0 flex justify-center md:justify-start pointer-events-none opacity-30 md:opacity-40">
                            <img
                              src={logoUrl}
                              alt="Logo"
                              className="w-32 h-auto md:w-64 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        )}

                        {/* Description */}
                        <div className="relative z-10 pt-10 md:pt-12">
                          <p className="text-secondary text-sm md:text-base lg:text-lg leading-relaxed text-center md:text-left">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mb-20"></div>
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mt-16"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
