import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../../components/layout/ProductGrid";
import { products } from "../../data/products";

const Search = () => {
  const { query: routeQuery } = useParams(); 
  
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!routeQuery) {
      setFilteredProducts(products);
      return;
    }

    const searchTerm = routeQuery.toLowerCase();

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.description && product.description.toLowerCase().includes(searchTerm))
    );
    
    setFilteredProducts(filtered);

  }, [routeQuery]);

  return (
    <div className="md:px-6 min-h-screen bg-gray-50 pt-4">

      <div className="mb-4 px-3">
         {routeQuery && (
            <p className="text-gray-500 text-sm">
               Search results for: <span className="font-bold text-gray-800">"{routeQuery}"</span>
            </p>
         )}
      </div>

      {/* Filtered Products Grid */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} title="Search Results" subtitle="" />
      ) : (
        <div className="text-center py-20 text-gray-500">
           No products found matching "{routeQuery}"
        </div>
      )}
    </div>
  );
};

export default Search;