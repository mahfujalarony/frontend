import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputNumber } from 'antd';

const ProductGrid = ({ 
  products = [], 
  viewAllLink = "/products", 
  onAddToCart 
}) => {
  
  const navigate = useNavigate();

 
  const defaultAddToCart = (product, quantity) => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleAddToCartClick = onAddToCart || defaultAddToCart;

  return (
    <div className="px-3 md:px-6">
      

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 mb-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 overflow-hidden group"
          >
            
            {/* Image Area */}
            <div className="h-28 md:h-32 w-full bg-gray-50 relative overflow-hidden">
              <img
                src={product.imageUrl?.[0] || 'https://via.placeholder.com/150'} // Fallback image check
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Area */}
            <div className="p-2 flex flex-col flex-grow">
              
              {/* Category */}
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5 truncate">
                {product.category || 'General'}
              </p>

              {/* Title */}
              <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight mb-1 h-8" title={product.name}>
                {product.name}
              </h3>

              {/* Price & Rating Row */}
              <div className="mt-auto">
                <div className="flex flex-wrap items-baseline justify-between mb-2">
                  <p className="text-sm font-bold text-gray-900">${product.price}</p>
                  <div className="flex items-center">
                     <span className="text-[10px] text-yellow-500">★</span>
                     <span className="text-[10px] text-gray-500 ml-0.5">{product.rating}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <InputNumber 
                    min={1} max={10} defaultValue={1} 
                    size="small" 
                    controls={false}
                    className="w-8 md:w-10 text-center rounded border-gray-200 text-[10px] h-7"
                    // Note: In real app, you need state to capture this value per card
                  />
                  <button 
                    onClick={() => handleAddToCartClick(product, 1)}
                    className="flex-grow bg-blue-600 hover:bg-blue-700 text-white text-[10px] md:text-xs font-medium h-7 rounded flex items-center justify-center transition-colors"
                  >
                    ADD
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Bottom Load More Button */}
      <div className="flex justify-center pb-8">
         <button 
           onClick={() => navigate(viewAllLink)}
           className="px-6 py-2 bg-white border border-gray-300 text-gray-700 text-xs md:text-sm font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm"
         >
           Load More Products
         </button>
      </div>

    </div>
  );
};

export default ProductGrid;