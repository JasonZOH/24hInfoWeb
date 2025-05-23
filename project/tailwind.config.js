/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1a1815',
        light: '#fff9f0',
        gold: '#ffd700',
        primary: '#ff9d4d',
        secondary: '#ffb84d',
        accent: '#ffe4a7',
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        sans: ['Source Sans 3', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)',
            transform: 'scale(1.05)'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in-out forwards',
        shimmer: 'shimmer 10s linear infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'warm-glow': 'radial-gradient(circle at center, rgba(255, 215, 0, 0.15), transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};