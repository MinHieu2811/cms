export type Product = {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  images?: string[];
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductList = {
  content: Product[];
  totalItems: number;
};
