import React from 'react'
import { ConfigProvider } from 'antd'
import HomePage from './components/pages/HomePage'
import './App.css'

function App() {
  return (
    <ConfigProvider>
      <HomePage />
    </ConfigProvider>
  )
}

export default App
