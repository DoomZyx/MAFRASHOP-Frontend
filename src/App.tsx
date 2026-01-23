import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import Shop from "./pages/shop/shop";
import ProductDetail from "./pages/productDetail/productDetail";
import Profile from "./pages/profile/profile";
import ScrollToTop from "./components/shared/ScrollToTop";

// Admin pages
import AdminLogin from "./pages/admin/login/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminProducts from "./pages/admin/products/AdminProducts";
import AdminOrders from "./pages/admin/orders/AdminOrders";
import AdminDeliveries from "./pages/admin/deliveries/AdminDeliveries";
import AdminUsers from "./pages/admin/users/AdminUsers";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import CheckoutCancel from "./pages/checkout/CheckoutCancel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        
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
          <Route path="orders" element={<AdminOrders />} />
          <Route path="deliveries" element={<AdminDeliveries />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
