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
