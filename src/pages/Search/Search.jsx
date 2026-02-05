import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { products } from "../../data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import ProductCard from "../../components/common/ProductCart";
import { message } from "antd";

const filterProducts = async (query = "") => {
  await new Promise((r) => setTimeout(r, 250));
  if (!query.trim()) return products;

  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm))
  );
};



const Search = () => {
  const { query: routeQuery = "" } = useParams();
      const dispatch = useDispatch();
    const handleAddToCartClick = (product, qty) => {
        console.log('Added to cart:', product.name, 'Qty:', qty, 'ta');
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl?.[0],
                qty: qty,
            })
        );
        message.success(`${qty} ${product.name} added to cart`);
    };

  const {
    data: filteredProducts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products-search", routeQuery],
    queryFn: () => filterProducts(routeQuery),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="container mx-auto px-2 py-6 pb-20 min-h-screen bg-gray-50">
      <h2 className="text-xl font-bold mb-4 px-1 text-gray-800">
        {routeQuery ? "Search Results" : "All Products"}
        <span className="text-sm font-normal text-gray-500 ml-2">
          ({filteredProducts.length} items)
        </span>
        {routeQuery && (
          <span className="text-sm font-normal text-gray-600 ml-2">
            for "<span className="font-semibold text-gray-800">{routeQuery}</span>"
          </span>
        )}
      </h2>

      {isLoading && (
        <div className="h-40 flex justify-center items-center text-gray-500">
          Loading...
        </div>
      )}

      {isError && (
        <div className="h-40 flex justify-center items-center text-red-500">
          Error: {error?.message || "Something went wrong"}
        </div>
      )}

      {!isLoading && !isError && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 mb-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCartClick}
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No products found matching "{routeQuery}"
        </div>
      )}
    </div>
  );
};

export default Search;