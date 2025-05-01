import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import SearchInput from '../molecules/SearchInput';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <AntHeader className="flex items-center justify-between px-4 bg-white">
      <div className="text-xl font-bold">Company Logo</div>
      <Menu
        mode="horizontal"
        items={menuItems}
        className="flex-1 flex justify-center border-none"
      />
      <div className="w-64">
        <SearchInput placeholder="Search anything..." />
      </div>
    </AntHeader>
  );
};

export default Header; 