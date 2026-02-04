import React from "react"
import { Routes, Route } from "react-router-dom"

// component imports 


//  for admin
import CreateItem from "./pages/Admin/CreateItem/CreateItem.jsx"
import Dashboard from "./pages/Admin/Dashboard/Dashboard.jsx"



// for user
import Coupons from "./pages/LeftSideSubComponet/Coupons/Coupons.jsx"
import HomeLayout from "./pages/Home/HomeLayout.jsx"
import DashboardLayout from "./pages/Admin/DashboardLayout.jsx"
import Offers from "./pages/LeftSideSubComponet/Offers/Offers.jsx"
import Favirotes from "./pages/LeftSideSubComponet/Favirotes/favirotes.jsx"
import HomeContent from "./pages/Home/HomeContent.jsx"
import Profile from "./pages/User/Profile.jsx"
import UserOrder from "./pages/User/UserOrder.jsx"
import WishListPage from "./pages/User/WishListPage.jsx"
import UserSettings from "./pages/User/UserSettings.jsx"


// flash sales and all products components
import FlashSales from "./components/common/FlashSales.jsx"
import AllProducts from "./components/common/AllProducts.jsx"


import Search from "./pages/Search/Search.jsx"

function App() {

  return (
    <>
      <Routes>

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-item" element={<CreateItem />} />
        </Route>



        {/* User Routes */}
        <Route path="/" element={<HomeLayout />} >
          <Route index element={<HomeContent />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="offers" element={<Offers />} />
          <Route path="favirites" element={<Favirotes />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<UserOrder />} />
          <Route path="wishlist" element={<WishListPage />} />
          <Route path="settings" element={<UserSettings />} />



          {/* flash sales and all products */}
          <Route path="flash-sales" element={<FlashSales />} />
          <Route path="products" element={<AllProducts />} />


          {/* search page */}
          <Route path="search/:query?" element={<Search />} />
          
        </Route>
      </Routes>
    </>
  )
}

export default App
