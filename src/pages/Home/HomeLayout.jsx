import React, { useState } from "react";
import { Layout, Menu, Grid, Drawer } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar";


import { BadgeDollarSign, Heart, HeartCrack } from "lucide-react"

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);   // desktop toggle
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile toggle
  const screens = useBreakpoint();
  const isMobile = !screens.md; // determine if the device is mobile
  const userPoints = 1200; // Example user points, replace with actual data as needed

  const navigate = useNavigate();
  const location = useLocation();

const menuItems = [
  { key: "/coupons", icon: <BadgeDollarSign style={{ color: "#fa541c" }} />, label: "Coupons" },
  { key: "offers", icon: <TagOutlined style={{ color: "#faad14" }} />, label: "Special Offers" },
  { key: "favirites", icon: <Heart style={{ color: "#13c2c2" }} />, label: "Favorites" },
];

  const MenuContent = (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={(e) => {
        navigate(e.key);
        if (isMobile) setDrawerOpen(false); // when select mobile menu, close drawer
      }}
      items={menuItems}
    />
  );

  return (
    <>
      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        // passing a separate toggle for mobile
        openDrawer={() => setDrawerOpen(true)}
        isMobile={isMobile}
      />
      <Layout>
        {/* Desktop Sider */}
        {!isMobile && (
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "sticky",
              top: 0,
            }}
          >
            {collapsed ? null : (
            <div class="w-full max-w-md p-4 bg-gradient-to-r from-[#FEF5D4] to-[#E5C973] flex items-center justify-between rounded-none">
              
              <div class="flex flex-col">
                <span class="text-gray-800 text-sm font-xs">Egg Club</span>
                <span class="text-black text-xs font-bold">{userPoints} Points</span>
              </div>

              <button class="bg-[#FEF6D8] cursor-pointer hover:bg-[#FFF9E5] text-gray-900 text-sm font-medium py-2 px-2 rounded-full transition-colors shadow-sm">
                Discounts
              </button>

            </div>
          )}
            {MenuContent}
          </Sider>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            placement="left"
            width={260}
            bodyStyle={{ padding: 0 }}
          >
            <div class="w-full max-w-md p-4 bg-gradient-to-r from-[#FEF5D4] to-[#E5C973] flex items-center justify-between rounded-none">
              
              <div class="flex flex-col">
                <span class="text-gray-800 text-sm font-xs">Egg Club</span>
                <span class="text-black text-xs font-bold">{userPoints} Points</span>
              </div>

              <button class="bg-[#FEF6D8] cursor-pointer hover:bg-[#FFF9E5] text-gray-900 text-sm font-medium py-2 px-2 rounded-full transition-colors shadow-sm">
                Discounts
              </button>

            </div>
            {MenuContent}
          </Drawer>
        )}

        <Layout>
          <Content
            style={{
              margin: "5px 10px",
              padding: 0,
              minHeight: "100vh",
              background: "#fff",
              borderRadius: 8,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default HomeLayout;