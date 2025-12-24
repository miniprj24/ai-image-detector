/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#0f172a', // Slate 900
          surface: '#1e293b', // Slate 800
          glass: 'rgba(30, 41, 59, 0.7)', // Semi-transparent Slate 800
          'text-main': '#f1f5f9', // Slate 100
          'text-sub': '#94a3b8', // Slate 400
          accent: '#38bdf8', // Sky 400
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.2)',
        'glow': '0 0 15px rgba(56, 189, 248, 0.5)',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      },
    },
  },
  plugins: [],
};
