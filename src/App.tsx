import React from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ButtonDemoPage from './components/pages/ButtonDemoPage'
import HeaderDemoPage from './components/pages/HeaderDemoPage'
import ProductCardDemoPage from './components/pages/ProductCardDemoPage'
import ProductCardSimpleDemo from './components/pages/ProductCardSimpleDemo'
import SimpleCardDemo from './components/pages/SimpleCardDemo'
import ProductCardDemo from './components/pages/ProductCardDemo'
import SessionCardDemo from './components/pages/SessionCardDemo'
import ReportTimerDemoPage from './components/pages/ReportTimerDemoPage'
import HomePage from './components/pages/HomePage'
import VehicleDetailsPage from './components/pages/VehicleDetailsPage'
import LegendDemo from './components/pages/LegendDemo'
import LegendCaptionDemo from './components/pages/LegendCaptionDemo'
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
          <Route path="/session-card-demo" element={<SessionCardDemo />} />
          <Route path="/report-timer-demo" element={<ReportTimerDemoPage />} />
          <Route path="/vehicle-details" element={<VehicleDetailsPage />} />
          <Route path="/vehicle-details/:id" element={<VehicleDetailsPage />} />
          <Route path="/legend-demo" element={<LegendDemo />} />
          <Route path="/legend-caption-demo" element={<LegendCaptionDemo />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
