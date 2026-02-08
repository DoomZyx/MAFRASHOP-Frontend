import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import Shop from "./pages/shop/shop";
import ProductDetail from "./pages/productDetail/productDetail";
import Profile from "./pages/profile/profile";
import Orders from "./pages/orders/orders";
import ScrollToTop from "./components/shared/ScrollToTop";

// Admin pages
import AdminLogin from "./pages/admin/login/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminProducts from "./pages/admin/products/AdminProducts";
import AdminStock from "./pages/admin/stock/AdminStock";
import AdminStats from "./pages/admin/stats/AdminStats";
import AdminOrders from "./pages/admin/orders/AdminOrders";
import AdminDeliveries from "./pages/admin/deliveries/AdminDeliveries";
import AdminUsers from "./pages/admin/users/AdminUsers";
import AdminAdmins from "./pages/admin/admins/AdminAdmins";
import AdminContact from "./pages/admin/contact/AdminContact";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import CheckoutCancel from "./pages/checkout/CheckoutCancel";
import ProStatusNotification from "./components/auth/ProStatusNotification";
import CookieBanner from "./components/cookies/CookieBanner";
import UpdateNotification from "./components/shared/UpdateNotification";
import About from "./pages/about/About";
import Expertise from "./pages/expertise/Expertise";
import SAV from "./pages/sav/SAV";
import Shipping from "./pages/shipping/Shipping";
import Returns from "./pages/returns/Returns";
import CGV from "./pages/legalInfos/CGV/cgv";
import Privacy from "./pages/legalInfos/Privacy/Privacy";
import CookiesPage from "./pages/legalInfos/Cookies/Cookies";
import Mentions from "./pages/legalInfos/Mentions/Mentions";

function App() {
  return (
    <>
      <ProStatusNotification />
      <CookieBanner />
      <UpdateNotification />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        
        {/* Info pages */}
        <Route path="/about" element={<About />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/sav" element={<SAV />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/terms" element={<CGV />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/mentions" element={<Mentions />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="stock" element={<AdminStock />} />
          <Route path="stats" element={<AdminStats />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="deliveries" element={<AdminDeliveries />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="admins" element={<AdminAdmins />} />
          <Route path="contact" element={<AdminContact />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
