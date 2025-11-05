import React, { useState } from "react";

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "manicure", name: "Manicure" },
    { id: "pedicure", name: "Pedicure" },
    { id: "nailart", name: "Nail Art" },
    { id: "extensions", name: "Extensions" },
  ];

  // Gallery images using picsum.photos
  const galleryItems = [
    {
      id: 1,
      category: "manicure",
      title: "Classic French Manicure",
      image: "https://picsum.photos/id/1011/400/300",
    },
    {
      id: 2,
      category: "nailart",
      title: "Floral Nail Art",
      image: "https://picsum.photos/id/1018/400/300",
    },
    {
      id: 3,
      category: "pedicure",
      title: "Spa Pedicure",
      image: "https://picsum.photos/id/1025/400/300",
    },
    {
      id: 4,
      category: "extensions",
      title: "Acrylic Extensions",
      image: "https://picsum.photos/id/1027/400/300",
    },
    {
      id: 5,
      category: "manicure",
      title: "Gel Manicure",
      image: "https://picsum.photos/id/1035/400/300",
    },
    {
      id: 6,
      category: "nailart",
      title: "Geometric Design",
      image: "https://picsum.photos/id/1041/400/300",
    },
    {
      id: 7,
      category: "pedicure",
      title: "Summer Pedicure",
      image: "https://picsum.photos/id/1043/400/300",
    },
    {
      id: 8,
      category: "nailart",
      title: "Glitter Nails",
      image: "https://picsum.photos/id/1050/400/300",
    },
    {
      id: 9,
      category: "manicure",
      title: "Ombre Nails",
      image: "https://picsum.photos/id/1054/400/300",
    },
    {
      id: 10,
      category: "extensions",
      title: "Stiletto Nails",
      image: "https://picsum.photos/id/1057/400/300",
    },
    {
      id: 11,
      category: "nailart",
      title: "Marble Effect",
      image: "https://picsum.photos/id/1059/400/300",
    },
    {
      id: 12,
      category: "pedicure",
      title: "Classic Pedicure",
      image: "https://picsum.photos/id/1062/400/300",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      {/* Header */}
      <div className="text-center py-20 px-5 bg-gradient-to-r from-primary-dark to-primary rounded-3xl text-white mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Gallery</h1>
        <p className="text-xl opacity-95">
          Discover our latest nail designs and transformations
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
              activeFilter === category.id
                ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
            } hover:-translate-y-0.5 hover:shadow-lg`}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-8 pt-12 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center py-16 px-5 bg-gradient-to-r from-secondary to-secondary-dark rounded-3xl text-white">
        <h2 className="text-4xl font-bold mb-5">Love What You See?</h2>
        <p className="text-xl mb-8 opacity-95">
          Book an appointment to get your dream nails today!
        </p>
        <button className="bg-white text-secondary-dark px-12 py-4 rounded-full text-lg font-semibold hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Gallery;
