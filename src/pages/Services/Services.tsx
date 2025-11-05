import React from "react";

const Services: React.FC = () => {
  const services = [
    {
      category: "Manicure Services",
      items: [
        { name: "Classic Manicure", price: "$25", duration: "30 min" },
        { name: "Gel Manicure", price: "$35", duration: "45 min" },
        { name: "French Manicure", price: "$30", duration: "40 min" },
        { name: "Deluxe Manicure", price: "$45", duration: "60 min" },
      ],
    },
    {
      category: "Pedicure Services",
      items: [
        { name: "Classic Pedicure", price: "$35", duration: "45 min" },
        { name: "Gel Pedicure", price: "$45", duration: "60 min" },
        { name: "Spa Pedicure", price: "$55", duration: "75 min" },
        { name: "Deluxe Pedicure", price: "$65", duration: "90 min" },
      ],
    },
    {
      category: "Nail Art & Extensions",
      items: [
        { name: "Acrylic Full Set", price: "$50", duration: "90 min" },
        { name: "Gel Extensions", price: "$60", duration: "90 min" },
        { name: "Nail Art (per nail)", price: "$5+", duration: "varies" },
        { name: "Nail Repair", price: "$10", duration: "15 min" },
      ],
    },
    {
      category: "Special Services",
      items: [
        { name: "Paraffin Treatment", price: "$15", duration: "20 min" },
        { name: "Callus Removal", price: "$10", duration: "15 min" },
        { name: "Polish Change", price: "$15", duration: "20 min" },
        {
          name: "Nail Strengthening Treatment",
          price: "$20",
          duration: "30 min",
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Header */}
      <div className="text-center mb-16 p-16 bg-gradient-to-r from-primary to-primary-dark rounded-3xl text-white">
        <h1 className="text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl opacity-95">
          Professional nail care services tailored to your needs
        </p>
      </div>

      {/* Services Content */}
      <div className="space-y-10">
        {services.map((serviceCategory, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-primary text-3xl font-bold mb-6 pb-4 border-b-4 border-primary">
              {serviceCategory.category}
            </h2>
            <div className="space-y-5">
              {serviceCategory.items.map((service, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-5 bg-gray-50 rounded-xl hover:translate-x-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-1">
                    <h3 className="text-gray-800 text-xl font-semibold mb-1">
                      {service.name}
                    </h3>
                    <p className="text-gray-500 text-sm italic">
                      {service.duration}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-primary min-w-[100px] text-right">
                    {service.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 p-12 bg-gradient-to-r from-secondary to-secondary-dark rounded-3xl text-white">
        <p className="text-lg mb-5">
          All services include consultation and aftercare advice
        </p>
        <button className="bg-white text-secondary-dark px-12 py-4 rounded-full text-lg font-semibold hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
          Book Your Service
        </button>
      </div>
    </div>
  );
};

export default Services;

