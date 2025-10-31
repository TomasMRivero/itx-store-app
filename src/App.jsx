import './App.css'
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import ProductPage from './components/pages/ProductPage'
import ProductDetailPage from './components/pages/ProductDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Route>

      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  )
}

export default App
