import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ProductCard = ({ product, onAddToCart }) => {
    const [qty, setQty] = useState(1);

    const handleQtyChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQty(value);
        } else {
            setQty(1);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 overflow-hidden group">
            <Link to={`/products/${product.id}`} className="block">
                <div className="h-28 md:h-32 w-full bg-gray-50 relative overflow-hidden">
                    <img
                        src={product.imageUrl?.[0] || 'https://via.placeholder.com/150'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </Link>

            <div className="p-2 flex flex-col flex-grow">
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5 truncate">
                    {product.category || 'General'}
                </p>

                <Link to={`/products/${product.id}`} className="block">
                    <h3
                        className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight mb-1 h-8 hover:text-blue-600 transition-colors"
                        title={product.name}
                    >
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto">
                    <div className="flex flex-wrap items-baseline justify-between mb-2">
                        <p className="text-sm font-bold text-gray-900">${product.price}</p>
                        <div className="flex items-center">
                            <span className="text-[10px] text-yellow-500">★</span>
                            <span className="text-[10px] text-gray-500 ml-0.5">{product.rating}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={qty}
                            onChange={handleQtyChange}
                            className="w-8 md:w-10 text-center rounded border border-gray-200 text-[10px] h-7 focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                            onClick={() => onAddToCart(product, qty)}
                            className="flex-grow bg-blue-600 hover:bg-blue-700 text-white text-[10px] md:text-xs font-medium h-7 rounded flex items-center justify-center transition-colors active:scale-95"
                        >
                            ADD
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
