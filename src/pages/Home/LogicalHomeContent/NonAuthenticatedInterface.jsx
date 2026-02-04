import React from "react";
import discount from "./../../../public/discounts.jpg";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const NonAuthenticatedInterface = () => {
  return (
    <div>
      <section
        className="w-full bg-gradient-to-b from-purple-100 via-pink-50 to-orange-50 flex"
        style={{ minHeight: "70vh" }} // না হলে 80vh করে দেখুন; প্রয়োজনে height-ও সেট করুন
      >
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 w-full h-full">
          <div className="h-full grid md:grid-cols-2 items-center gap-10">
            {/* Left: Text + Search */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
                  Grocery Delivery
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                  Grocery Delivered at <br className="hidden sm:block" /> your
                  Doorstep
                </h1>
                <p className="text-gray-600">
                  Fresh items delivered fast — search and get started.
                </p>
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

            {/* Right: Image area (hidden on small screens) */}
            <div className="hidden md:flex justify-center h-full">
              <div className="w-full max-w-md h-full">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 border border-purple-100 shadow-lg overflow-hidden flex items-center justify-center h-full">
                  <img
                    src={discount}
                    alt="Grocery delivery"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="h-[100vh]">
        2nd Section
      </section>
    </div>
  );
};

export default NonAuthenticatedInterface;