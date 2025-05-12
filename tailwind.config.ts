// tailwind.config.js
module.exports = {
    darkMode: 'class', // <--- important
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: { extend: {
       animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        zoomIn: 'zoomIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        zoomIn: {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      },
    } },
    plugins: [],
  };
  