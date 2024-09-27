/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#1b1b1b',
        light: '#fff',
        accent: '#7B00D3',
        accentDark: '#ffdb4d',
        gray: '#747474'
      },
      // fontFamily: {
      //   mr: ['var(--font-mr)'],
      //   in: ['var(--font-in)']
      // },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'from 180deg at 50% 50%, var(--tw-gradient-stops)',
        'kultprosvet-header': "url('./src/assets/header_back.png')"
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

