/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spec-navy': '#0F274F',
        'spec-primary': '#1268E8',
        'spec-bright': '#1688FF',
        'spec-cyan': '#22C7E8',
        'spec-surface-light': '#F4F9FF',
        'spec-border': '#E2E8F0',
        'spec-muted': '#64748B',
        'spec-green': '#22C55E',
        'spec-orange': '#F59E0B',
        'spec-white': '#FFFFFF',
        'spec-bg-subtle-1': '#F8FAFC',
        'spec-bg-subtle-2': '#F1F7FF',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'spec-card': '0 4px 20px rgba(15, 39, 79, 0.05)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite'
      }
    },
  },
  plugins: [],
}
