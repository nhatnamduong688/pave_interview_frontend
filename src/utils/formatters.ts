/**
 * Format a date to a string
 * @param date - The date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Truncate a string to a maximum length
 * @param text - The text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add to truncated text
 * @returns Truncated string
 */
export const truncateText = (
  text: string,
  maxLength: number = 100,
  suffix: string = '...'
): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}${suffix}`;
}; 