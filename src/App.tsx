import React from 'react'
import { ConfigProvider } from 'antd'
import ButtonDemoPage from './components/pages/ButtonDemoPage'
import './App.css'

function App() {
  return (
    <ConfigProvider>
      <ButtonDemoPage />
    </ConfigProvider>
  )
}

export default App
