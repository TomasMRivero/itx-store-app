import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import ProductPage from './components/pages/ProductPage'
import ProductDetailPage from './components/pages/ProductDetailPage'
import labels from './i18n/es.json';

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />} >
				<Route index element={<Navigate to="/products" replace />} breadcrumb={labels.common.pages.home} />
				<Route path="/products" element={<ProductPage />} breadcrumb={labels.common.pages.products} />
				<Route path="/products/:id" element={<ProductDetailPage />} breadcrumb={labels.common.pages.productDetails} />
			</Route>

			<Route path="*" element={<h1>404 - Página no encontrada</h1>} />
		</Routes>
	)
}

export default App
