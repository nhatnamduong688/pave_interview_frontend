import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search',
  onSearch,
  className = '',
}) => {
  return (
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      enterButton={<SearchOutlined />}
      className={`w-full ${className}`}
    />
  );
};

export default SearchInput; 