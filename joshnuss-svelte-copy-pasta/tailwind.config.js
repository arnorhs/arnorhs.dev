module.exports = {
  // ...(process.env.NODE_ENV !== 'production'
  //   ? {}
  //   : { purge: ['./src/**/*.js', './src/**/*.svelte'] }),
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        indigo: {
          lighter: '#b3bcf5',
          default: '#5c6ac4',
          dark: '#ff0000'
        }
      }
    }
  },
  variants: {},
  plugins: []
}
