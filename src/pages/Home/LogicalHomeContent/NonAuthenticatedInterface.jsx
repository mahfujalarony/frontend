import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ShoppingBasket, Pill, Soup, Package, Wallet, Clock, Tag } from "lucide-react";

//image import 
import discount from "./../../../public/discounts.jpg";

// for 4th catagory horizontal scroll images
import a1 from "./../../../public/horizontal scroll image nonauth component/a1.jpg";
import a2 from "./../../../public/horizontal scroll image nonauth component/a2.jpg";
import a3 from "./../../../public/horizontal scroll image nonauth component/a3.jpg";
import a4 from "./../../../public/horizontal scroll image nonauth component/a4.jpg";
import a5 from "./../../../public/horizontal scroll image nonauth component/a5.jpg";
import a6 from "./../../../public/horizontal scroll image nonauth component/a6.jpg";
import a7 from "./../../../public/horizontal scroll image nonauth component/a7.jpg";
import a8 from "./../../../public/horizontal scroll image nonauth component/a8.jpg";
import a9 from "./../../../public/horizontal scroll image nonauth component/a9.jpg";
import a10 from "./../../../public/horizontal scroll image nonauth component/a10.jpg";


// for 5th catagory image
import s1 from "./../../../public/assets/s1.jpg";
import s2 from "./../../../public/assets/s2.jpg";
import s3 from "./../../../public/assets/s3.jpg";


// for 6th section image
import shop from "./../../../public/assets/shop.jpg";



const NonAuthenticatedInterface = () => {

  // 2nd Section Grocery, Pharmacy, Cookups data
  const cards = [
    { title: "Grocery", icon: <ShoppingBasket size={48} className="text-orange-500" />, bgColor: "bg-[#fef3c7]" },
    { title: "Pharmacy", icon: <Pill size={48} className="text-teal-500" />, bgColor: "bg-[#bae6fd]" },
    { title: "Cookups", icon: <Soup size={48} className="text-red-500" />, bgColor: "bg-[#bbf7d0]" },
  ];


  // 3rd Section Our Features data
  const features = [
    { title: "+ 15000 products to shop from", icon: <Package className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />, highlight: "products" },
    { title: "Pay after receiving products", icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />, highlight: "after" },
    { title: "Get your delivery within 1 hour", icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />, highlight: "1 hour" },
    { title: "Get offers that Save Money", icon: <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />, highlight: "Save Money" },
  ];

  // 4th Section Popular Categories data
  const catagorys = [
    { name: "Vegetables", image: a1 },
    { name: "Fruits", image: a2 },
    { name: "Dairy", image: a3 },
    { name: "Bakery", image: a4 },
    { name: "Snacks", image: a5 },
    { name: "Beverages", image: a6 },
    { name: "Meat", image: a7 },
    { name: "Seafood", image: a8 },
    { name: "Frozen Foods", image: a9 },
    { name: "Household", image: a10 },
  ]



  // 5th Section Shop & Get data
  const shopAndGet = [
    { image: s1, title: "Shop & Earn Points", description: "The more you shop the more you earn - cash back, free shipping, exclusive offers and more. Discover the perks of Egg Club membership" },
    { image: s2, title: "Organic Fruits", description: "Enjoy a variety of organic fruits at great prices." },
    { image: s3, title: "Dairy Products", description: "High-quality dairy products for your daily needs." },
  ];

  // 6th Section start shoping
  const startShoping = [
    { title: "Shop your daily necessities", description: "Shop from our popular category, Explore special offers and receive grocery on your doorsteps within 1 hour."  ,image: shop },
  ]


  // 7th Section 
  const stats = [
  {
    title: "26 warehouses",
    subtitle: "all over bangladesh",
    icon: "🏬",
    iconBg: "bg-orange-100",
  },
  {
    title: "5 million orders",
    subtitle: "have been delivered",
    icon: "🛒",
    iconBg: "bg-emerald-100",
  },
  {
    title: "100,000 families",
    subtitle: "are being served",
    icon: "👨‍👩‍👧‍👦",
    iconBg: "bg-blue-100",
  },
  {
    title: "340 million Taka",
    subtitle: "customer savings",
    icon: "🙌",
    iconBg: "bg-amber-100",
  },
];

  const renderTitle = (title, highlight) => {
    const parts = title.split(highlight);
    return (
      <span className="text-sm sm:text-base md:text-lg text-gray-600 leading-tight">
        {parts[0]}
        <strong className="text-gray-800 font-semibold">{highlight}</strong>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="overflow-x-hidden">



      {/* 1st Hero Section */}
      <section className="w-full bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50 flex" style={{ minHeight: "70vh" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 w-full flex items-center">
          <div className="grid md:grid-cols-2 items-center gap-10 w-full">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Grocery Delivery</p>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                  Grocery Delivered at <br className="hidden sm:block" /> your Doorstep
                </h1>
                <p className="text-gray-600">Fresh items delivered fast — search and get started.</p>
              </div>
              <div className="max-w-xl">
                <Input
                  size="large"
                  placeholder="Search for products (e.g. eggs, milk, potato)"
                  suffix={<SearchOutlined className="text-xl text-gray-500" />}
                  className="shadow-sm rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="hidden md:flex justify-center h-full">
              <div className="w-full max-w-md">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 border border-purple-100 shadow-lg overflow-hidden">
                  <img src={discount} alt="Grocery delivery" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* 2nd Section Grocery, Pharmacy, Cookups */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-4 w-full place-items-center">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`${card.bgColor} rounded-3xl p-6 flex flex-col items-center justify-center w-full max-w-[120px] md:max-w-72 h-32 md:h-40 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
                >
                  <div className="bg-white rounded-full p-4 mb-3 flex items-center justify-center shadow-inner">
                    {React.cloneElement(card.icon, { size: 28 })}
                  </div>
                  <h2 className="text-sm md:text-lg font-semibold text-gray-800 tracking-tight text-center">{card.title}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




      {/* 3rd Section Our Features */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
              >
                <div className="flex-shrink-0 mt-0.5 sm:mt-0">{feature.icon}</div>
                <div className="flex-grow">{renderTitle(feature.title, feature.highlight)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* 4th Section Popular Categories horizontal scroll */}
      <section className="py-12 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Popular Categories</h2>
            <span className="text-sm text-gray-500 hidden sm:inline">Swipe to explore</span>
          </div>

          <div className="relative">
            <div className="overflow-x-auto overflow-y-hidden">
              <div
                className="
                  grid grid-flow-col auto-cols-[70%]
                  sm:auto-cols-[50%]
                  md:auto-cols-[33%]
                  lg:auto-cols-[22%]
                  gap-4 sm:gap-6
                  snap-x snap-mandatory
                  pb-2
                "
              >
                {catagorys.map((cat, idx) => (
                  <div
                    key={idx}
                    className="
                      snap-start
                      bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300
                      border border-gray-100
                      overflow-hidden
                      flex flex-col
                    "
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="text-sm sm:text-base font-semibold text-gray-800">{cat.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Fresh & curated</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* 5th Section Shop & Get More */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl  font-light text-center text-gray-800 mb-8">Shop & Get More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {shopAndGet.map((item, index) => (
              <div
                key={index}
                className={[
                  "border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-white",
                  index > 0 ? "hidden sm:block" : "", // akane soto device e sudu 1 st ta dekalam caldal er moto
                ].join(" ")}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 6th Section: Start Shopping CTA */}
      <section className="py-14 bg-gradient-to-r from-orange-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="
            relative overflow-hidden rounded-3xl
            bg-gray-900 text-white
            shadow-xl
            grid grid-cols-1 md:grid-cols-2
          ">
            {/* Image */}
            <div className="order-1 md:order-2 h-64 md:h-full">
              <img
                src={shop}
                alt="Start shopping"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="order-2 md:order-1 p-8 md:p-10 flex flex-col justify-center bg-linear-to-r from-purple-600 via-purple-400 to-purple-400 gap-4">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-200">Start Shopping</p>
              <h3 className="text-2xl md:text-3xl font-bold leading-snug">
                Shop your daily necessities in minutes
              </h3>
              <p className="text-sm md:text-base text-gray-100 leading-relaxed">
                Explore popular categories, grab special offers, and get your groceries delivered to your doorstep within an hour.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  className="px-5 py-2.5 rounded-full bg-green-500 hover:cursor-pointer text-white font-semibold shadow-lg transition-all duration-200"
                >
                  Start shopping
                </button>

              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm text-orange-100">
                <span className="inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                1-hour delivery available in select areas
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 7th Section: Stats */}
      <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl shadow-sm bg-white border border-gray-100"
            >
              <div
                className={[
                  "flex h-12 w-12 items-center justify-center rounded-xl text-2xl",
                  item.iconBg,
                ].join(" ")}
                aria-hidden="true"
              >
                <span>{item.icon}</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
       </section>



        {/* 8th Section Comon Qution */}
        <section>
          8th section
        </section>

    </div>
  );
};

export default NonAuthenticatedInterface;