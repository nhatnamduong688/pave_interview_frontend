import React from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ButtonDemoPage from './components/pages/ButtonDemoPage'
import HeaderDemoPage from './components/pages/HeaderDemoPage'
import ProductCardDemoPage from './components/pages/ProductCardDemoPage'
import ProductCardSimpleDemo from './components/pages/ProductCardSimpleDemo'
import SimpleCardDemo from './components/pages/SimpleCardDemo'
import ProductCardDemo from './components/pages/ProductCardDemo'
import './App.css'

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/buttons" element={<ButtonDemoPage />} />
          <Route path="/header" element={<HeaderDemoPage />} />
          <Route path="/product-cards" element={<ProductCardDemoPage />} />
          <Route path="/product-card-simple" element={<ProductCardSimpleDemo />} />
          <Route path="/simple-card" element={<SimpleCardDemo />} />
          <Route path="/product-card-demo" element={<ProductCardDemo />} />
          <Route path="/" element={<Navigate to="/header" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
