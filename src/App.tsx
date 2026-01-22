import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import Shop from "./pages/shop/shop";
import ProductDetail from "./pages/productDetail/productDetail";
import Profile from "./pages/profile/profile";
import Admin from "./pages/admin/admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
