export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  comment: string;
  avatar?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
}
