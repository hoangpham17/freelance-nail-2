import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Location */}
          <div>
            <h3 className="text-yellow-400 text-xl font-serif mb-6 tracking-wider">
              LOCATION
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              795 UNIVERSITY AVE, MADISON, WI 53715
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=795+UNIVERSITY+AVE,+MADISON,+WI+53715"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 underline transition-colors duration-300"
            >
              SHOW DIRECTION
            </a>
            <div className="mt-6">
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=795+UNIVERSITY+AVE,+MADISON,+WI+53715&zoom=15&size=400x200&markers=color:red%7C795+UNIVERSITY+AVE,+MADISON,+WI+53715&key=YOUR_GOOGLE_MAPS_API_KEY"
                alt="Location Map"
                className="rounded-lg w-full"
                onError={(e) => {
                  // Fallback if Google Maps API key not set
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x200/1a1a1a/666666?text=Map";
                }}
              />
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-yellow-400 text-xl font-serif mb-6 tracking-wider">
              BUSINESS HOURS
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-white">9:30am - 7:30pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Saturday</span>
                <span className="text-white">9:30am - 5:00pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Sunday</span>
                <span className="text-white">11:00am - 4:00pm</span>
              </div>
            </div>
          </div>

          {/* Keep in Touch */}
          <div>
            <h3 className="text-yellow-400 text-xl font-serif mb-6 tracking-wider">
              KEEP IN TOUCH
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+16087201011"
                className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300"
              >
                (608) 720 1011
              </a>
              <a
                href="mailto:contact@madisonnaillounge.com"
                className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 break-words"
              >
                contact@madisonnaillounge.com
              </a>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.instagram.com/madisonnaillounge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-yellow-400 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/madisonnaillounge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-yellow-400 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} Madison Nail Lounge. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
