import './App.css'
import { BrowserRouter, Router, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
