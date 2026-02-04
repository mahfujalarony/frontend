import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import UserDropDown from "../ui/UserDropDown";
import LocationDropDown from "../ui/LocationDropDown";
import NotificationSidebar from "../ui/NotificationSidebar";

const Navbar = ({ collapsed, setCollapsed, openDrawer, isMobile }) => {
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("Dhaka");
  const [notificationCount] = useState(12);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (value) => console.log("Searching for:", value);
  const handleLocationChange = (newLocation) => setLocation(newLocation);

  return (
    <div
      className={[
        "w-full sticky top-0 z-50 border-b backdrop-blur-lg transition-all duration-300",
        "bg-white/70", 
        scrolled ? "shadow-lg bg-white/85" : "shadow-sm bg-white/60", // স্ক্রলে সামান্য গাঢ় ও শেডো
      ].join(" ")}
    >
      <div className="h-1 w-full bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 animate-gradient-x" />
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <LeftSection
            onLocationChange={handleLocationChange}
            location={location}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            openDrawer={openDrawer}
            isMobile={isMobile}
          />
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
            className="hidden md:block"
          />
          <RightSection notificationCount={notificationCount} />
        </div>
      </div>
    </div>
  );
};

const LeftSection = ({ onLocationChange, setCollapsed, openDrawer, isMobile, location }) => (
  <div className="flex items-center gap-6">
    <MenuOutlined
      onClick={() => {
        if (isMobile) openDrawer();
        else setCollapsed((prev) => !prev);
      }}
      className="text-xl text-gray-700 cursor-pointer hover:text-orange-500 transition-all duration-300 hover:scale-110"
    />
    <div className="flex items-center gap-2 cursor-pointer group">
      <div className="relative w-8 h-10 bg-linear-to-br from-orange-300 via-orange-400 to-orange-500 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-white/30 to-transparent rounded-full" />
      </div>
      <span className="text-3xl font-bold bg-linear-to-r from-gray-800 via-purple-700 to-orange-600 bg-clip-text text-transparent tracking-tight font-serif italic group-hover:scale-105 transition-transform duration-300">
        Chaldal
      </span>
    </div>
    <div className="hidden md:block">
      <LocationDropDown onLocationChange={onLocationChange} location={location} />
    </div>
  </div>
);

const SearchBar = ({ searchValue, setSearchValue, handleSearch, className = "" }) => (
  <div className={`flex-1 max-w-3xl ${className}`}>
    <Input
      size="large"
      placeholder="Search for products (e.g. eggs, milk, potato)"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onPressEnter={() => handleSearch(searchValue)}
      suffix={
        <SearchOutlined
          className="text-xl text-gray-500 cursor-pointer hover:text-orange-500 transition-colors hover:scale-110 duration-200"
          onClick={() => handleSearch(searchValue)}
        />
      }
      className="rounded-lg bg-linear-to-r from-gray-50 to-purple-50 hover:from-white hover:to-white focus:from-white focus:to-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
      style={{ padding: "8px 20px" }}
    />
  </div>
);

const RightSection = ({ notificationCount }) => (
  <div className="flex items-center gap-5">
    <NotificationSidebar notificationCount={notificationCount} />
    <UserDropDown />
  </div>
);

export default Navbar;