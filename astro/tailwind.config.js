module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
  // more options here

  theme: {
    fontFamily: {
      // there's maybe a way to set the serif to be the default?
      sans: '"Figtree"',
      serif: '"Figtree"',
      display: '"Figtree"',
      nav: '"Figtree"',
    },

    container: {
      center: true,
    },

    screens: {
      xs: '420px',
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
        bright: '#e6e9fc',
        lighter: '#a3ace5',
        DEFAULT: '#5c6ac4',
        darker: '#4f5680',
      },
      myorange: {
        DEFAULT: 'rgb(255,192,203)',
      },
    },
  },
  plugins: [],
}
