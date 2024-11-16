import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, List, message } from "antd";
import { BiCart, BiCheckCircle, BiWallet } from "react-icons/bi";
import { useOrders } from "../../hooks/useOrders";

interface CartItem {
  orderId: number; // Use orderId instead of id
  productCategory: string;
  productName: string;
  price: number;
  variant: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<"cart" | "details" | "payment">(
    "cart"
  );
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { createOrder } = useOrders();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        setCartItems(parsedCart); // Set the cart items from local storage
      }
    } else {
      setCartItems([]); // Clear cart items when modal is closed
    }
  }, [isOpen]);

  const removeItem = (orderId: number) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.orderId !== orderId
    );
    setCartItems(updatedCartItems); // Update state immediately
    localStorage.setItem("cart", JSON.stringify(updatedCartItems)); // Update local storage
    message.success("Item removed from cart");
  };

  const handleCustomerDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    if (
      !customerDetails.name ||
      !customerDetails.email ||
      !customerDetails.phone ||
      !customerDetails.address
    ) {
      message.error("Please fill in all customer details.");
      return;
    }

    // Validate cart items
    if (cartItems.length === 0) {
      message.error("Your cart is empty. Add items to checkout.");
      return;
    }

    const orderItems = cartItems
      .map((item) => {
        if (
          !item.productCategory ||
          !item.productName ||
          !item.variant ||
          item.price === undefined ||
          item.quantity === undefined
        ) {
          message.error(
            "One or more cart items are missing required information."
          );
          return null; // Skip this item
        }
        return {
          category: item.productCategory,
          name: item.productName,
          variant: item.variant,
          quantity: item.quantity,
          price: item.price,
        };
      })
      .filter((item) => item !== null); // Remove any null items

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = {
      id: new Date().toISOString(),
      customer: {
        name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
        address: customerDetails.address,
      },
      items: orderItems,
      totalAmount,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Proceed with creating the order
    setLoading(true);
    try {
      const response = await createOrder(order);
      if (response) {
        message.success("Order created successfully!");
        onClose();
      } else {
        message.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      message.error("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Shopping Cart"
      centered
      width={400}
    >
      <div className="tabs-navigation mb-4">
        <Button
          onClick={() => setActiveTab("cart")}
          type={activeTab === "cart" ? "primary" : "default"}
        >
          <BiCart /> Cart
        </Button>
        <Button
          onClick={() => setActiveTab("details")}
          type={activeTab === "details" ? "primary" : "default"}
        >
          <BiCheckCircle /> Details
        </Button>
        <Button
          onClick={() => setActiveTab("payment")}
          type={activeTab === "payment" ? "primary" : "default"}
        >
          <BiWallet /> Payment
        </Button>
      </div>

      {/* Tabs Content */}
      {activeTab === "cart" && (
        <div>
          <h2>Your Cart</h2>
          {cartItems.length > 0 ? (
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      danger
                      onClick={() => removeItem(item.orderId)}
                    >
                      Remove
                    </Button>,
                  ]}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ margin: 0 }}>{item.productName}</h3>
                    <p style={{ margin: 0, color: "#888" }}>
                      {item.productCategory} - {item.variant}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "4px",
                      }}
                    >
                      <span>Qty: {item.quantity}</span>
                      <span>₱{item.price.toFixed(2)}</span>
                      <span>
                        Total: ₱{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <div>Your cart is empty.</div>
          )}
          <Button type="primary" onClick={() => setActiveTab("details")}>
            Next
          </Button>
        </div>
      )}

      {activeTab === "details" && (
        <Form onFinish={() => setActiveTab("payment")}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
            <Input
              value={customerDetails.name}
              onChange={handleCustomerDetailsChange}
              placeholder="John Doe"
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input
              value={customerDetails.email}
              onChange={handleCustomerDetailsChange}
              placeholder="john.doe@example.com"
              name="email"
            />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input
              value={customerDetails.phone}
              onChange={handleCustomerDetailsChange}
              placeholder="(123) 456-7890"
              name="phone"
            />
          </Form.Item>
          <Form.Item label="Shipping Address" name="address">
            <Input.TextArea
              value={customerDetails.address}
              onChange={handleCustomerDetailsChange}
              rows={3}
              placeholder="123 Main St, Apt 4B, City, State, ZIP"
              name="address"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      )}

      {activeTab === "payment" && (
        <div>
          <h2>Payment Method</h2>
          <p>This is the payment method section. COD only.</p>
          <div>
            <Button type="primary" onClick={handleCheckout} loading={loading}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CartModal;
