import React, { useState } from "react";
import { Dropdown, Button } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import userImage from "./../../public/demoUser.png";

// ckkk korar jonno rakci jate user na takle login/signup button dekha jay
const demoUser = {
  name: "Mahfuzur Rahman",
  imageUrl: userImage,
};
 //const demoUser = null; 

const UserDropDown = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // ইউজার না থাকলে লগইন/সাইনআপ দেখাবে
  if (!demoUser) {
    return (
      <div className="flex gap-2 px-3">
        <Button type="default" onClick={() => navigate("/login")}>
          Log in
        </Button>
        <Button type="primary" onClick={() => navigate("/signup")}>
          Sign up
        </Button>
      </div>
    );
  }

  const handleClick = (key) => {
    setVisible(false);
    if (key === "logout") {
      console.log("Logout");
      return;
    }
    navigate(`/${key}`);
  };

  const menu = (
    <div className="bg-white rounded-lg shadow-lg border w-56 py-2">
      <div className="px-4 py-3 border-b">
        <p className="font-semibold text-gray-800">{demoUser?.name}</p>
      </div>

      <div className="py-1">
        <MenuItem
          icon={<UserOutlined />}
          label="Profile"
          onClick={() => handleClick("profile")}
        />
        <MenuItem
          icon={<ShoppingOutlined />}
          label="My Orders"
          badge={3}
          onClick={() => handleClick("orders")}
        />
        <MenuItem
          icon={<HeartOutlined />}
          label="Wishlist"
          badge={12}
          onClick={() => handleClick("wishlist")}
        />
        <MenuItem
          icon={<SettingOutlined />}
          label="Settings"
          onClick={() => handleClick("settings")}
        />
        <div className="border-t my-1"></div>
        <MenuItem
          icon={<LogoutOutlined />}
          label="Logout"
          onClick={() => handleClick("logout")}
          danger
        />
      </div>
    </div>
  );

  return (
    <Dropdown
      dropdownRender={() => menu}
      placement="bottomRight"
      trigger={["hover", "click"]}
      open={visible}
      onOpenChange={setVisible}
    >
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-all"
        onMouseEnter={() => setVisible(true)}
      >
        <img
          src={demoUser.imageUrl || userImage}
          alt={demoUser.name || "User"}
          height={20}
          width={20}
          className="w-9 h-9 rounded-full"
        />
        <span className="hidden lg:block font-medium text-gray-700">
          {demoUser.name?.split(" ")[0] || "User"}
        </span>
        <DownOutlined className="text-xs text-gray-500 hidden lg:block" />
      </div>
    </Dropdown>
  );
};

// Menu Item with Badge
const MenuItem = ({ icon, label, badge, onClick, danger }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-2 cursor-pointer transition-all
      ${danger ? "hover:bg-red-50 text-red-600" : "hover:bg-gray-50 text-gray-700"}
    `}
  >
    <span className="text-base">{icon}</span>
    <span className="text-sm font-medium flex-1">{label}</span>
    {badge && (
      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-5 text-center">
        {badge > 99 ? "99+" : badge}
      </span>
    )}
  </div>
);

export default UserDropDown;