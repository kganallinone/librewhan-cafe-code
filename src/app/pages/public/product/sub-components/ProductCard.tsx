import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const getRandomGradient = () => {
  const colors = [
    "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
    "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
    "bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600",
    "bg-gradient-to-r from-red-400 via-yellow-500 to-orange-600",
    "bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

interface ProductCardProps {
  product: any;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<null | {
    name: string;
    price: number;
  }>(null);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const photos = product?.photos || [];
  const price = selectedVariant?.price || product?.variants[0]?.price || 0;
  const variants = product?.variants || [];
  const initials = getInitials(product.name);

  const handleVariantClick = (variant: { name: string; price: number }) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({
      id: product.id,
      orderId: Date.now(),
      productCategory: product.category,
      productName: product.name,
      price: price,
      variant: selectedVariant
        ? selectedVariant.name
        : product.variants[0].name,
      quantity: quantity,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
    console.log(JSON.parse(localStorage.getItem("cart") || "[]"));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden relative">
      <div className="relative">
        <div
          className={`w-full h-64 ${
            imageError ? getRandomGradient() : ""
          } bg-cover bg-center flex items-center justify-center`}
        >
          {!imageError && (
            <img
              className="w-full h-full object-cover"
              src={photos[currentPhotoIndex]}
              alt={product.name}
              onError={() => setImageError(true)}
            />
          )}
          {imageError && (
            <div className="text-white font-bold text-4xl">{initials}</div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
          {photos.map((_: any, index: number) => (
            <button
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === currentPhotoIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => setCurrentPhotoIndex(index)}
            />
          ))}
        </div>
        <button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 p-2 gap-2 flex items-center bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full text-white hover:from-amber-500 hover:via-amber-600 hover:to-amber-700"
          aria-label="Add to cart"
        >
          Add to cart <FaShoppingCart />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 border-b">
          {product.name}
        </h3>
        <div className="flex gap-2">
          <p className="text-gray-500 mt-2 text-xs border rounded-full w-fit px-2 py-1">
            {product.category}
          </p>
          {product.subcategory === "b1t1" && (
            <p className="text-amber-600 mt-2 bg-amber-200 font-semibold text-xs border rounded-full w-fit px-2 py-1">
              BUY 1 TAKE 1
            </p>
          )}
        </div>

        <p className="text-gray-800 font-semibold mt-2">
          ₱{(price * quantity).toFixed(2)}
        </p>
        <p className="text-gray-500 mt-2 uppercase">{product.status}</p>
        <div className="mt-4 flex items-center justify-between">
          <button
            className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
        {variants.length > 0 && (
          <div className="mt-4">
            <div className="mt-2 flex gap-2">
              {variants.map((variant: any, index: number) => (
                <button
                  key={index}
                  className="w-fit bg-amber-500 p-2 text-white rounded-md hover:bg-amber-600 focus:outline-none text-nowrap"
                  onClick={() =>
                    handleVariantClick(
                      variant as { name: string; price: number }
                    )
                  }
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
