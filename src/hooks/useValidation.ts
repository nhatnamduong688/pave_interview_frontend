import { useState, useCallback } from 'react';
import { validate } from '../constants/validation';

type ValidationRules = {
  [key: string]: any;
};

type FormValues = {
  [key: string]: any;
};

type FormErrors = {
  [key: string]: string[];
};

/**
 * Custom hook for form validation
 * @param initialValues - Initial form values
 * @param validationSchema - Schema with validation rules
 * @returns Validation state and methods
 */
export const useValidation = (
  initialValues: FormValues = {},
  validationSchema: Record<string, ValidationRules> = {}
) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it has been touched
    if (touched[name] && validationSchema[name]) {
      const fieldErrors = validate(value, validationSchema[name]);
      setErrors(prev => ({ ...prev, [name]: fieldErrors }));
    }
  }, [touched, validationSchema]);
  
  // Set touched state when field is blurred
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    if (validationSchema[name]) {
      const fieldErrors = validate(values[name], validationSchema[name]);
      setErrors(prev => ({ ...prev, [name]: fieldErrors }));
    }
  }, [values, validationSchema]);
  
  // Manually set field value
  const setValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate if field has been touched
    if (touched[name] && validationSchema[name]) {
      const fieldErrors = validate(value, validationSchema[name]);
      setErrors(prev => ({ ...prev, [name]: fieldErrors }));
    }
  }, [touched, validationSchema]);
  
  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);
  
  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // Check each field in the validation schema
    Object.entries(validationSchema).forEach(([fieldName, rules]) => {
      const fieldErrors = validate(values[fieldName], rules);
      if (fieldErrors.length > 0) {
        isValid = false;
        newErrors[fieldName] = fieldErrors;
      }
    });
    
    setErrors(newErrors);
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(validationSchema).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    return isValid;
  }, [values, validationSchema]);
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setValue,
    resetForm,
    validateForm,
    // Helper method to check if form is valid
    isValid: Object.keys(errors).length === 0,
    // Helper to get the first error for a field
    getError: (fieldName: string) => errors[fieldName]?.[0] || null,
    // Helper to check if a field has error
    hasError: (fieldName: string) => Boolean(errors[fieldName]?.length),
  };
};

export default useValidation; 