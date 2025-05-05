// Validation related constants and utilities

// Validation rules
export const VALIDATION_RULES = {
  REQUIRED: 'required',
  EMAIL: 'email',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  PATTERN: 'pattern',
  MATCH: 'match',
};

// Regular expressions for validation
export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  PHONE: /^\+?[0-9]{10,15}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]*$/,
  NUMERIC: /^[0-9]*$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Default error messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Cannot exceed ${max} characters`,
  PATTERN: 'Invalid format',
  MATCH: 'Fields do not match',
  URL: 'Please enter a valid URL',
  PHONE: 'Please enter a valid phone number',
  NUMERIC: 'Please enter only numbers',
  PASSWORD: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
};

// Validator functions
export const validators = {
  required: (value: any) => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },
  
  email: (value: string) => {
    return VALIDATION_PATTERNS.EMAIL.test(value);
  },
  
  minLength: (value: string, min: number) => {
    return value && value.length >= min;
  },
  
  maxLength: (value: string, max: number) => {
    return value && value.length <= max;
  },
  
  pattern: (value: string, pattern: RegExp) => {
    return pattern.test(value);
  },
  
  match: (value: string, compareValue: string) => {
    return value === compareValue;
  },
};

// Simple validation function
export const validate = (value: any, rules: {[key: string]: any}) => {
  const errors: string[] = [];
  
  Object.entries(rules).forEach(([rule, ruleValue]) => {
    switch (rule) {
      case VALIDATION_RULES.REQUIRED:
        if (ruleValue && !validators.required(value)) {
          errors.push(VALIDATION_MESSAGES.REQUIRED);
        }
        break;
        
      case VALIDATION_RULES.EMAIL:
        if (ruleValue && value && !validators.email(value)) {
          errors.push(VALIDATION_MESSAGES.EMAIL);
        }
        break;
        
      case VALIDATION_RULES.MIN_LENGTH:
        if (!validators.minLength(value, ruleValue)) {
          errors.push(VALIDATION_MESSAGES.MIN_LENGTH(ruleValue));
        }
        break;
        
      case VALIDATION_RULES.MAX_LENGTH:
        if (!validators.maxLength(value, ruleValue)) {
          errors.push(VALIDATION_MESSAGES.MAX_LENGTH(ruleValue));
        }
        break;
        
      case VALIDATION_RULES.PATTERN:
        if (value && !validators.pattern(value, ruleValue)) {
          errors.push(VALIDATION_MESSAGES.PATTERN);
        }
        break;
        
      case VALIDATION_RULES.MATCH:
        if (!validators.match(value, ruleValue)) {
          errors.push(VALIDATION_MESSAGES.MATCH);
        }
        break;
        
      default:
        break;
    }
  });
  
  return errors;
}; 