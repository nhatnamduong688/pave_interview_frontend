import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

export interface ButtonProps extends AntButtonProps {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <AntButton
      className={`${className}`}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button; 