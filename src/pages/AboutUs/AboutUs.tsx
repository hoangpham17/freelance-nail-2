import React from "react";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";

/**
 * About Us Data Structure from Airtable
 * Only contains description field
 */
interface AboutUsData {
  id?: string;
  description: string;
}

// Predefined card styles for visual variety
const CARD_COLORS = [
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
      <div className="text-center py-20 px-5 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            About Us
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-6 opacity-50"></div>
          <p className="text-xl opacity-95">
            Your trusted destination for luxury nail care
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 px-5">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`
                    ${CARD_COLORS[index % CARD_COLORS.length]}
                    rounded-2xl p-8 
                    shadow-lg hover:shadow-2xl 
                    transition-all duration-300 
                    hover:-translate-y-2
                    border border-gray-100
                    relative overflow-hidden
                  `}
                >
                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>

                  {/* Description */}
                  <div className="relative z-10 pt-8">
                    <p className="text-secondary-light text-lg leading-relaxed text-center">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
