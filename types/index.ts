export interface ImageType {
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}
export interface ProductType {
  origin: string;
  _type: string;
  _createdAt: string;
  category: string;
  price: number;
  _updatedAt: string;
  image: ImageType[];
  _rev: string;
  description: string;
  colour: string;
  name: string;
  rate: number;
  _id: string;
  slug: { current: string; _type: string };
}

export interface BannerType {
  image: ImageType;
  name: string;
}

export interface sessionType {
  data: {
    user: { email: string; username: string };
    expires: string;
  };
  status: string;
}

export interface FormType {
  label: string;
  type: string;
  onChange?: React.ReactEventHandler<HTMLInputElement>;
  value?: string;
  htmlFor: string;
  placeholder?: string;
}
export interface CartProducType {
  user_email: string;
  timeStamp?: any;
  _id: string;
  image: ImageType;
  name: string;
  category: string;
  price: number;
  color: string;
  origin: string;
  size: number;
  quantity: number;
}
