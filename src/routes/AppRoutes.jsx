import { Route, Routes } from 'react-router-dom';

import Artikel from '../pages/Artikel';
import CariDokter from '../pages/cariDokter';
import DokterDetail from '../pages/ProfilDokter';
import Home from '../pages/home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import ChatContainer from '../components/ChatContainer';
import DetailArtikel from '../components/DetailArtikel';
import OrderDokter from '../components/Order-Dokter';
import SuksesDokter from '../components/SuksesDokter';
import ProtectedRoute from '../components/ProtectedRoute';
import AIDokterPage from '../pages/AIDokterPage';

const NotFound = () => <h1>404 - Halaman tidak ditemukan</h1>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/cari-dokter" element={<CariDokter />} />
      <Route path="/artikel" element={<Artikel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profil-dokter/:id" element={<DokterDetail />} />
      <Route path="/detail-artikel/:articleId" element={<DetailArtikel />} />

      {/* Protected routes — requires login */}
      <Route path="/order-dokter/:id" element={
        <ProtectedRoute>
          <OrderDokter />
        </ProtectedRoute>
      } />
      <Route path="/sukses-order-dokter" element={
        <ProtectedRoute>
          <SuksesDokter />
        </ProtectedRoute>
      } />
      <Route path="/chat" element={
        <ProtectedRoute>
          <ChatContainer />
        </ProtectedRoute>
      } />

      {/* AI Doctor Route */}
      <Route path="/ai-dokter" element={
        <ProtectedRoute>
          <AIDokterPage />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
