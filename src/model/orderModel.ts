export interface Order {
  id: string; // Unique identifier for the order
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "completed" | "shipped" | "cancelled"; // Status of the order
  createdAt: Date;
  updatedAt: Date; // Date when the order was last updated
}

interface OrderItem {
  id: string;
  category: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
}
