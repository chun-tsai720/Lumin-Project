/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        lumin: {
          black: '#030303',
          dark: '#0a0a0a',
          gold: '#D4AF37',
          goldlight: '#F5D061',
          golddark: '#997A15',
          gray: '#888888',
          surface: 'rgba(20, 20, 20, 0.6)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

export default tailwindConfig;
