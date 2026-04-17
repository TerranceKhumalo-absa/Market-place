import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import TechnicalCatalog from './pages/TechnicalCatalog';
import AssetDetail from './pages/AssetDetail';
import MyData from './pages/MyData';

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/technical-catalog" element={<TechnicalCatalog />} />
          <Route path="/asset/:id" element={<AssetDetail />} />
          <Route path="/my-data" element={<MyData />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
