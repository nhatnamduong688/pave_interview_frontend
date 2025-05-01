import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from '../organisms/Header';

const { Content, Footer } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="p-6">
        <div className="bg-white p-6 rounded shadow">
          {children}
        </div>
      </Content>
      <Footer className="text-center">
        ©{new Date().getFullYear()} Company Name - All Rights Reserved
      </Footer>
    </Layout>
  );
};

export default MainLayout; 