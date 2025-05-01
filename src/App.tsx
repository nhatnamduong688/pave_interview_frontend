import React from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ButtonDemoPage from './components/pages/ButtonDemoPage'
import HeaderDemoPage from './components/pages/HeaderDemoPage'
import './App.css'

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/buttons" element={<ButtonDemoPage />} />
          <Route path="/header" element={<HeaderDemoPage />} />
          <Route path="/" element={<Navigate to="/header" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
