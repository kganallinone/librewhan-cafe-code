import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import ProductFilter from "../../../components/filter/ProductFilter";
import { Product } from "../../../../model/productsModel";
import CartFab from "../../../components/fab/CartFab";
import { LoadingProductCard } from "./sub-components/ProductCardLazy";
import { useProduct } from "../../../hooks/useProduct";

// Dynamically import ProductCard component
const ProductCard = lazy(() =>
  import("./sub-components/ProductCard").then((module) => ({
    default: module.ProductCard, // Adjust to use named export
  }))
);

const defaultCategory = "Hot Coffee"; // Moved outside of the component

const ProductPage = () => {
  const { getProducts } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = useCallback(
    (category: string) => {
      if (category === "") {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(
          products.filter((product) => product.category === category)
        );
      }
    },
    [products]
  );

  const fetchProducts = async () => {
    try {
      const products: any = await getProducts();
      setProducts(products);
      if (products.length > 0) {
        const uniqueCategories = Array.from(
          new Set(products.map((product: any) => product.category))
        );
        setCategories(uniqueCategories as string[]);

        // Set filtered products for the default category
        const defaultFilteredProducts = products.filter(
          (product: any) => product.category === defaultCategory
        );
        setFilteredProducts(defaultFilteredProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mt-24 mb-12 grid grid-cols-12 gap-2">
        <div className="col-span-2 w-full">
          <ProductFilter
            categories={categories}
            onCategoryChange={handleCategoryChange}
            defaultCategory={defaultCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 col-span-10">
          {filteredProducts ? (
            filteredProducts.map((product, index) => (
              <Suspense
                key={index}
                fallback={
                  <div>
                    {" "}
                    <LoadingProductCard />
                  </div>
                } // Placeholder while loading ProductCard
              >
                <ProductCard product={product} key={index} />
              </Suspense>
            ))
          ) : (
            <div>
              <LoadingProductCard />
            </div>
          )}
        </div>
      </div>
      <CartFab />
    </div>
  );
};

export default ProductPage;
