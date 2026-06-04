import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';
import { OrderProvider } from './context/OrderContext';

// Layout
import { Header } from './components/Header';

// Pages
import Home from './pages/home';
import CariDokter from './pages/cariDokter';
import Artikel from './pages/Artikel';
import Toko from './pages/toko';
import Login from './pages/Login';
import Register from './pages/Register';
import DokterDetail from './pages/ProfilDokter';

// Feature Components (used as pages)
import Cart from './components/cart';
import ProductList from './components/ProductList';
import OrderDokter from './components/Order-Dokter';
import SuksesDokter from './components/SuksesDokter';
import ChatContainer from './components/ChatContainer';
import OrderSukses from './components/OrderSukses';
import DetailArtikel from './components/DetailArtikel';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <UserProvider>
            <OrderProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cari-dokter" element={<CariDokter />} />
                <Route path="/artikel" element={<Artikel />} />
                <Route path="/toko" element={<Toko />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profil-dokter/:id" element={<DokterDetail />} />
                <Route path="/order-dokter/:id" element={<OrderDokter />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/sukses-order-dokter" element={<SuksesDokter />} />
                <Route path="/chat" element={<ChatContainer />} />
                <Route path="/sukses-order" element={<OrderSukses />} />
                <Route path="/detail-artikel/:articleId" element={<DetailArtikel />} />
                {/* /:penyakit must be LAST — it is a wildcard catch-all for medicine categories */}
                <Route path="/:penyakit" element={<ProductList />} />
                <Route path="*" element={<h1>404 — Halaman tidak ditemukan</h1>} />
              </Routes>
            </OrderProvider>
          </UserProvider>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;