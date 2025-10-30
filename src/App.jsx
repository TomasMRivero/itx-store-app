import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import ProductPage from './components/pages/ProductPage'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<ProductPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
