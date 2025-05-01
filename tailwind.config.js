/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Safelist cho màu sắc - đảm bảo các lớp này không bị loại bỏ
    {
      pattern: /bg-(red|green|blue|yellow|purple|gray|amber)-(100|300|500|700|900)/,
    },
    {
      pattern: /text-(red|green|blue|yellow|purple|gray|amber)-(100|300|500|700|900)/,
    },
    {
      pattern: /border-(red|green|blue|yellow|purple|gray|amber)-(100|300|500|700|900)/,
    },
  ],
};
