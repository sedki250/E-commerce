export interface IWishlist {
    _id: string;
  id: string;   // لاحظ إن الـ API بيرجع الاتنين: `_id` و `id`
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

