import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputNumber, Rate, Button, Alert } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Footer from './../../../components/common/Footer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import ProductCard from '../../../components/common/ProductCart';
import { message } from 'antd';

// Component import 
import Story from '../../../components/ui/Story';

// Importing story images
import s1 from './../../../public/storyImage/s1.webp';
import s2 from './../../../public/storyImage/s2.webp';
import s3 from './../../../public/storyImage/s3.webp';
import s4 from './../../../public/storyImage/s4.webp';
import s5 from './../../../public/storyImage/s5.webp';
import s6 from './../../../public/storyImage/s6.webp';
import s7 from './../../../public/storyImage/s7.webp';
import s8 from './../../../public/storyImage/s8.webp';
import s9 from './../../../public/storyImage/s9.webp';
import s10 from './../../../public/storyImage/s10.webp';

// offers image import
import o1 from './../../../public/offers/o1.webp';
import o2 from './../../../public/offers/o2.webp';
import o3 from './../../../public/offers/o3.webp';
import o4 from './../../../public/offers/o4.webp';
import o5 from './../../../public/offers/o5.webp';
import o6 from './../../../public/offers/o6.webp';
import o7 from './../../../public/offers/o7.webp';
import o8 from './../../../public/offers/o8.webp';
import o9 from './../../../public/offers/o9.webp';
import o10 from './../../../public/offers/o10.webp';

// Data import
import { getFlashSaleProducts } from '../../../data/products';
import { products } from '../../../data/products';
import ProductGrid from '../../../components/layout/ProductGrid';

const storyData = [
  { title: "Fresh", image: s1 }, { title: "Vegetables", image: s2 }, { title: "Dairy", image: s3 }, 
  { title: "Fruits", image: s4 }, { title: "Water", image: s5 }, { title: "Meat", image: s6 }, 
  { title: "Bakery", image: s7 }, { title: "Frozen", image: s8 }, { title: "Fish", image: s9 }, 
  { title: "Fresh", image: s10 }
];

const offersImage = [o1, o2, o3, o4, o5, o6, o7, o8, o9, o10];

const AuthenticatedHomeContentInterface = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // akane 10 ta flash select kora product top e deakiteci jodi aro dekte chi tohole /flash-sales e navigate kore deci
  const flashSaleProducts = getFlashSaleProducts().slice(0, 10);

  // akane all procuts er 30 ta first e dekiteci jodi aro dekte chi tahole /products e navigate kore debo
  const allProducts = products.slice(0, 30);

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

   // search handler function
    const handleSearch = (event) => {
      event.preventDefault(); 
      const query = event.target.search.value.trim(); 
      if (!query) return; 
      navigate(`/search/${encodeURIComponent(query)}`); 
    };

  return (
    <div className="pb-12 bg-gray-50 min-h-screen">
      
      {/* Story Section */}
      <div className="bg-white pt-4 pb-2 mb-4 shadow-sm">
        <Story storyData={storyData} />
      </div>

      {/* Flash Sale Section */}
      <div className="px-4 md:px-6">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Flash Sale</h2>
            <p className="text-xs text-gray-500 mt-1">Limited time offers</p>
          </div>
          <Link 
            to="/flash-sales" 
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All &rarr;
          </Link>
        </div>

        {/* Scrollable Container */}
        <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x">
          
          {flashSaleProducts.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[180px] w-[180px] bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col snap-start border border-gray-100 overflow-hidden group"
            >
              {/* Product Image Area */}
              <div className="h-40 w-full bg-gray-50 relative overflow-hidden">
                <img 
                  src={product.imageUrl[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  SALE
                </span>
              </div>

              {/* Content Area */}
              <div className="p-3 flex flex-col flex-grow">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{product.category || 'Item'}</p>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight mb-1 h-10" title={product.name}>
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <Rate 
                    disabled 
                    defaultValue={product.rating} 
                    className="text-xs text-yellow-400" 
                    style={{ fontSize: 10 }} 
                  />
                  <span className="text-[10px] text-gray-400 ml-1">({product.stock})</span>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg font-bold text-gray-900">${product.price}</p>
                    {product.oldPrice && (
                       <p className="text-xs text-gray-400 line-through">${product.oldPrice}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <InputNumber 
                      min={1} 
                      max={10} 
                      defaultValue={1} 
                      size="small"
                      className="w-14 rounded-md border-gray-200"
                      controls={false} 
                    />
                    <Button 
                      type="primary" 
                      size="small"
                      icon={<ShoppingCartOutlined />}
                      onClick={() =>handleAddToCartClick(product, 1)}
                      className="flex-grow bg-gray-900 hover:bg-black border-none shadow-none rounded-md flex justify-center items-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offers Section (NEW ADDITION) */}
      <div className="px-4 md:px-6 my-8">
        {/* Offers Header */}
        <div className="flex justify-between items-end mb-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Special Offers</h2>
            <p className="text-xs text-gray-500 mt-1">Exclusive deals for you</p>
          </div>
          <Link 
            to="/offers" 
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View More &rarr;
          </Link>
        </div>

        {/* Offers Scrollable List */}
        <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide snap-x">
          {offersImage.map((img, index) => (
            <Link 
              to={`/offers/${index + 1}`} 
              key={index}
              className="min-w-[280px] md:min-w-[350px] h-[160px] md:h-[200px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 snap-center relative group"
            >
              <img 
                src={img} 
                alt={`Offer ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 md:px-6 my-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Find Your Perfect Product
            </h2>
            <p className="text-sm text-gray-500">
              Search from thousands of products at the best prices
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                type="search" 
                id="search" 
                className="block w-full py-4 pl-12 pr-32 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-sm" 
                placeholder="Search for products, brands, categories..." 
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-6 py-2.5 transition-colors shadow-sm"
              >
                Search
              </button>
            </div>
          </form>
          
          {/* Popular Searches */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-gray-500">Popular:</span>
            {['Fresh Vegetables', 'Dairy Products', 'Organic Fruits', 'Bakery Items'].map((term) => (
              <button 
                key={term}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All Products Section */}

      <div className="px-4 md:px-6">
        <div className="flex justify-between items-end mb-4">
          <span className="text-lg font-semibold text-gray-800">Our Products</span>
          <Link
            to="/products"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 mb-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCartClick}
            />
          ))}
        </div>

        {/* view all button */}
        <div className="flex justify-center">
          <Link
            to="/products"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All Products →
          </Link>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  )
}

export default AuthenticatedHomeContentInterface;