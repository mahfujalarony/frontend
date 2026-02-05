import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { MenuOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";
import UserDropDown from "../ui/UserDropDown";
import LocationDropDown from "../ui/LocationDropDown";
import NotificationSidebar from "../ui/NotificationSidebar";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./../../public/logo.jpg";

const Navbar = ({ collapsed, setCollapsed, openDrawer, isMobile }) => {
  const [location, setLocation] = useState("Dhaka");
  const [notificationCount] = useState(12);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();
  const locationPath = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (locationPath.pathname.startsWith("/search/")) {
      const queryFromUrl = decodeURIComponent(
        locationPath.pathname.split("/search/")[1] || ""
      );
      setSearchValue(queryFromUrl);
    } else if (!locationPath.pathname.startsWith("/search")) {
      setSearchValue("");
    }
  }, [locationPath.pathname]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim()) navigate(`/search/${encodeURIComponent(value)}`);
    else navigate(`/search`);
  };

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/search/${encodeURIComponent(value)}`);
      setShowMobileSearch(false); 
    }
  };

  const handleLocationChange = (newLocation) => setLocation(newLocation);

  return (
    <div
      className={[
        "w-full sticky top-0 z-50 border-b backdrop-blur-lg transition-all duration-300",
        "bg-white/70",
        scrolled ? "shadow-lg bg-white/85" : "shadow-sm bg-white/60",
      ].join(" ")}
    >
      <div className="h-1 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 animate-gradient-x" />
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

          {/* Desktop search */}
          <SearchBar
            searchValue={searchValue}
            setSearchValue={handleInputChange}
            handleSearch={handleSearch}
            className="hidden md:block"
          />

          {/* Right side + mobile search icon */}
          <div className="flex items-center gap-3">
            {/* Mobile search toggle */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700"
              onClick={() => setShowMobileSearch((prev) => !prev)}
              aria-label="Search"
            >
              {showMobileSearch ? (
                <CloseOutlined className="text-lg" />
              ) : (
                <SearchOutlined className="text-lg" />
              )}
            </button>
            <RightSection notificationCount={notificationCount} />
          </div>
        </div>
      </div>

      {/* Mobile search dropdown */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-2 animate-slideDown">
            <Input
              size="large"
              placeholder="Search for products..."
              value={searchValue}
              onChange={handleInputChange}
              onPressEnter={() => handleSearch(searchValue)}
              suffix={
                <SearchOutlined
                  className="text-xl text-gray-500 cursor-pointer"
                  onClick={() => handleSearch(searchValue)}
                />
              }
              className="rounded-lg bg-gray-50 border-gray-200 shadow-sm"
              style={{ padding: "8px 20px" }}
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};

const LeftSection = ({ onLocationChange, setCollapsed, openDrawer, isMobile, location }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-6">
      <MenuOutlined
        onClick={() => {
          if (isMobile) openDrawer();
          else setCollapsed((prev) => !prev);
        }}
        className="text-xl text-gray-700 cursor-pointer hover:text-orange-500 transition-all duration-300 hover:scale-110"
      />
      <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer group">
        <img src={logo} alt="Shop Logo" className="w-10 h-10" />
        <span className="text-3xl hidden md:block font-bold bg-gradient-to-r select-none from-gray-800 via-purple-700 to-orange-600 bg-clip-text text-transparent tracking-tight font-serif italic group-hover:scale-105 transition-transform duration-300">
          Shop
        </span>
      </div>
      <div className="hidden md:block">
        <LocationDropDown onLocationChange={onLocationChange} location={location} />
      </div>
    </div>
  );
};

const SearchBar = ({ searchValue, setSearchValue, handleSearch, className = "" }) => (
  <div className={`flex-1 max-w-3xl ${className}`}>
    <Input
      size="large"
      placeholder="Search for products..."
      value={searchValue}
      onChange={setSearchValue}
      onPressEnter={() => handleSearch(searchValue)}
      suffix={
        <SearchOutlined
          className="text-xl text-gray-500 cursor-pointer"
          onClick={() => handleSearch(searchValue)}
        />
      }
      className="rounded-lg bg-gray-50 border-gray-200 shadow-sm"
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