import { useEffect, useState } from "react";

interface ProductFilterProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  defaultCategory: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  onCategoryChange,
  defaultCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  useEffect(() => {
    // Only call onCategoryChange once on mount to avoid unnecessary renders
    onCategoryChange(defaultCategory);
  }, [defaultCategory, onCategoryChange]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`mr-2 mb-2 px-4 py-2 border rounded w-full ${
            selectedCategory === category
              ? " bg-amber-500 text-white font-bold"
              : " text-amber-500"
          } hover:bg-amber-400 hover:text-white transition`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;
