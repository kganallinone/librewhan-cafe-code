export interface Product {
  id?: number;
  customId?: string;
  barcode?: string;
  name: string;
  description?: string;
  price?: number;
  photos?: [string];
  quantity: number;
  category: string;
  subcategory: string;
  status: string;
  variants?: [
    {
      name?: string;
      price?: number;
      quantity?: number;
      status?: string;
      size?: string;
      color?: string;
      photos?: [string];
    }
  ];
  made?: string;
  origin?: string;
  tags?: [string];
  inventedBy?: string;
  manufacturedBy?: string;
}
