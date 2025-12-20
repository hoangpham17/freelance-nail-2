export interface AboutUsSection {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  position: "left" | "right";
}

export interface AboutUsData {
  titleImage: string;
  sections: AboutUsSection[];
}

export const aboutUsData: AboutUsData = {
  titleImage: "/assets/images/About-Us/title.png",
  sections: [
    {
      id: "our-1",
      title: "OUR",
      description:
        "Our team of experienced technicians is devoted to delivering the highest quality treatments, utilizing the finest products and equipment available.",
      image: "/assets/images/About-Us/block-1.png",
      imageAlt: "Nail polish bottles",
      position: "left",
    },
    {
      id: "our-2",
      title: "OUR",
      description:
        "Our highly skilled technicians have undergone advanced training and consistently stay up-to-date with the latest trends and techniques in nail care. Whether you are seeking a simple, classic manicure or an intricate nail design, our technicians will skillfully bring your vision to life.",
      image: "/assets/images/About-Us/block-1.png",
      imageAlt: "Nail care",
      position: "right",
    },
    {
      id: "we",
      title: "WE",
      description:
        "We are more than just a nail salon. We are an exceptional oasis of beauty, relaxation, and top-notch service. Our mission is to provide our valued clients with an outstanding service that leaves them feeling pampered, rejuvenated, and confident.",
      image: "/assets/images/About-Us/block-3.png",
      imageAlt: "Hand care",
      position: "left",
    },
  ],
};
