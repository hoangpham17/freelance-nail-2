import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../routes/Routes";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: PATHS.home, label: "Home" },
    { path: PATHS.services, label: "Services" },
    { path: PATHS.hostAParty, label: "Host A Party" },
    { path: PATHS.gallery, label: "Gallery" },
    { path: PATHS.aboutUs, label: "About Us" },
    { path: PATHS.ourPolicies, label: "Our Policies" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-primary/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-5">
        {/* Logo */}
        <Link
          to={PATHS.home}
          className="text-2xl md:text-3xl font-serif font-bold text-secondary hover:text-primary transition-colors duration-300 tracking-wide"
          onClick={closeMenu}
        >
          Madison Nail Lounge
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1 z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-1 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-5 py-2.5 font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-primary border-b-2 border-primary"
                    : "text-secondary-light hover:text-primary"
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Book Now Button - Desktop */}
        <button className="hidden lg:block bg-primary text-white px-8 py-3 font-medium hover:bg-primary-dark transition-all duration-300 ml-5">
          BOOK NOW
        </button>

        {/* Mobile Menu */}
        <ul
          className={`lg:hidden fixed top-20 bg-white w-full text-center shadow-xl py-5 transition-all duration-300 border-t border-primary/20 ${
            isMenuOpen ? "left-0" : "-left-full"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.path} className="w-full">
              <Link
                to={item.path}
                className={`block py-4 px-5 w-full font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-secondary hover:text-primary hover:bg-accent-cream"
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
