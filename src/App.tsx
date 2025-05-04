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
import VehicleDetailsRedux from './components/pages/VehicleDetailsRedux'
import LegendDemo from './components/pages/LegendDemo'
import LegendCaptionDemo from './components/pages/LegendCaptionDemo'
import FooterBarDemo from './components/pages/FooterBarDemo'
import MaterialSelectorDemo from './components/pages/MaterialSelectorDemo'
import ComponentSelectorDemo from './components/pages/ComponentSelectorDemo'
import AllSelectorsDemo from './components/pages/AllSelectorsDemo'
import OptionStateDemo from './components/pages/OptionStateDemo'
import EnhancedAllSelectorsDemo from './components/pages/EnhancedAllSelectorsDemo'
import DamageSelectionWithPopup from './components/pages/DamageSelectionWithPopup'
import ReduxDemoPage from './components/pages/ReduxDemoPage'
import VehicleDamageSelectionRedux from './components/pages/VehicleDamageSelectionRedux'
import DamageSelectionRedux from './components/pages/DamageSelectionRedux'
import ClickableImageDemo from './components/pages/ClickableImageDemo'
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
          <Route path="/vehicle-details-redux" element={<VehicleDetailsRedux />} />
          <Route path="/vehicle-details-redux/:id" element={<VehicleDetailsRedux />} />
          <Route path="/legend-demo" element={<LegendDemo />} />
          <Route path="/legend-caption-demo" element={<LegendCaptionDemo />} />
          <Route path="/footer-bar-demo" element={<FooterBarDemo />} />
          <Route path="/material-selector" element={<MaterialSelectorDemo />} />
          <Route path="/component-selector" element={<ComponentSelectorDemo />} />
          <Route path="/all-selectors" element={<AllSelectorsDemo />} />
          <Route path="/option-states" element={<OptionStateDemo />} />
          <Route path="/enhanced-selectors" element={<EnhancedAllSelectorsDemo />} />
          <Route path="/damage-selection" element={<DamageSelectionWithPopup />} />
          <Route path="/damage-selection-redux" element={<DamageSelectionRedux />} />
          <Route path="/redux-demo" element={<ReduxDemoPage />} />
          <Route path="/vehicle-damage-redux" element={<VehicleDamageSelectionRedux />} />
          <Route path="/clickable-image" element={<ClickableImageDemo />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
