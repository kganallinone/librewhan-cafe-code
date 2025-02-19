import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "../modal/CartModal";

const CartFab: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="fixed bottom-4 right-4 bg-amber-500 text-white p-4 rounded-full shadow-lg cursor-pointer"
      >
        <FaShoppingCart size={24} />
      </div>
      <CartModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default CartFab;

// const botData: BotData[] = [
//   {
//     question: "How can I franchise a Librewhan Cafe?",
//     answer:
//       "To franchise a Librewhan Cafe, fill out our franchise application form on the website, and our team will get in touch with you to discuss the next steps.",
//   },
//   {
//     question: "What are the requirements for franchising?",
//     answer:
//       "The requirements include a minimum investment amount, an appropriate location, and a commitment to follow our brand guidelines. Contact us for more detailed information.",
//   },
//   {
//     question: "Can I visit your store locations before deciding to franchise?",
//     answer:
//       "Yes, we encourage you to visit our store locations to experience our atmosphere and services firsthand before making a decision.",
//   },
//   {
//     question: "How long does the franchise approval process take?",
//     answer:
//       "The approval process typically takes 2-4 weeks, depending on the completeness of the application and the evaluation of your proposed location.",
//   },
//   {
//     question: "Do you offer training for new franchisees?",
//     answer:
//       "Yes, we provide comprehensive training for all new franchisees, including operations, marketing, and staff management to ensure your success.",
//   },
// ];
