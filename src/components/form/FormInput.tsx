import React from 'react';

interface FormInputProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * FormInput component with validation support
 */
const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  className = '',
  style = {},
}) => {
  const hasError = error && touched;
  
  const inputClasses = `
    form-input
    ${hasError ? 'form-input-error' : ''}
    ${className}
  `;
  
  return (
    <div className="form-field" style={style}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={inputClasses}
        style={{
          borderColor: hasError ? 'var(--color-error)' : 'var(--theme-input-border)',
          backgroundColor: 'var(--theme-input-bg)',
          padding: 'var(--spacing-sm)',
          borderRadius: 'var(--border-radius-sm)',
          width: '100%',
          fontSize: 'var(--font-size-base)',
          lineHeight: 'var(--line-height-normal)',
        }}
      />
      
      {hasError && (
        <div className="error-message" style={{ 
          color: 'var(--color-error)',
          fontSize: 'var(--font-size-xs)',
          marginTop: 'var(--spacing-xs)'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput; 