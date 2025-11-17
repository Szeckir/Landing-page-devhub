/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#4ADE80',
          dark: '#1B1C1D',
        },
        urgency: {
          red: '#DC2626',
          orange: '#EA580C',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
        'gradient-urgency': 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1B1C1D 0%, #0F172A 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
