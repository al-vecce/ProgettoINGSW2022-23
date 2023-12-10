/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: {
          100: '#f7fafc',
          900: '#1a202c',
          999: '#9090A6',
        },
        orange: {
          500: '#CE7E2B',
          600: '#c2792d',
        },
        purple: {
          999: '#393945',
        },
        primary: {
          1: '#fff',
          2: '#2CA062',
          3: '#14894A',
          4: '#4E504E',
          icon: '#444453',
          gray: '#D9D9D9',
          textgray: '#9090A6',
          accent1: '#F87F01',
          accent2: '#FF9D00',
          error: '#D60E0E',
        }
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
