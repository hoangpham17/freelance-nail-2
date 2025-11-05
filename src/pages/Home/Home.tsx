import React from "react";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-accent-cream to-white py-32 px-5">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-secondary mb-6 tracking-tight">
            Experience Luxury
            <span className="block text-primary mt-2">Nail Care</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary-light mb-10 max-w-3xl mx-auto leading-relaxed">
            Madison's premier destination for exceptional nail services in an
            elegant, relaxing atmosphere
          </p>
          <button className="bg-primary text-white px-12 py-4 text-lg font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl">
            BOOK YOUR APPOINTMENT
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-secondary mb-16">
            Why Choose Madison Nail Lounge
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-secondary mb-4">
                Expert Technicians
              </h3>
              <p className="text-secondary-light leading-relaxed">
                Highly trained professionals dedicated to perfection
              </p>
            </div>

            <div className="text-center p-8 border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-secondary mb-4">
                Premium Products
              </h3>
              <p className="text-secondary-light leading-relaxed">
                Finest quality products for exceptional results
              </p>
            </div>

            <div className="text-center p-8 border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
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
              </div>
              <h3 className="text-2xl font-serif font-bold text-secondary mb-4">
                Hygiene First
              </h3>
              <p className="text-secondary-light leading-relaxed">
                Strict sterilization protocols for your safety
              </p>
            </div>

            <div className="text-center p-8 border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-secondary mb-4">
                Relaxing Atmosphere
              </h3>
              <p className="text-secondary-light leading-relaxed">
                Luxurious environment designed for your comfort
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-24 px-5">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Indulge in Excellence
          </h2>
          <p className="text-xl mb-10 text-white/90 leading-relaxed">
            Treat yourself to an unforgettable nail care experience at Madison's
            most elegant salon
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-12 py-4 text-lg font-medium hover:bg-primary-dark transition-all duration-300">
              BOOK NOW
            </button>
            <a
              href="tel:+16087201011"
              className="bg-white text-secondary px-12 py-4 text-lg font-medium hover:bg-accent-cream transition-all duration-300 inline-block"
            >
              CALL US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
