const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
  // more options here

  theme: {
    fontFamily: {
      sans: 'helvetica',
      serif: '"Andada Pro"',
      display: '"Bungee Shade"',
      nav: '"Bungee"',
    },

    container: {
      center: true,
    },

    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    colors: {
      mycard: {
        DEFAULT: '#fdfdfd',
      },
      myblue: {
        lighter: '#a3ace5',
        DEFAULT: '#5c6ac4',
      },
      myorange: {
        DEFAULT: 'pink',
      },
    },
  },
  plugins: [],
}
