/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.php"],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' }
    },
    fontFamily: {
      sans: ['Manrope', 'system-ui', 'sans-serif']
    },
    extend: {
      boxShadow: {
        '3xl': '-5px 5px 52px #b3b0ad, 5px -5px 52px #ffffff;',
      },
      colors: {
        mainColor: '#FFFCF7',
        buttonhover: '#738290',
        onbutton: '#A1B5D8',
        tgreen: '#c2d8b9',
        ltgreen: "#E4F0D0",
        clrBrown: '#9d7b64',
        clrLoft: '#DEAB96',
        clrLightBrown: '#c9b0a1',
        textColorDark: '#0f172a',
        textColor: '#475569'
      }
    },
  },
  plugins: [

  ],
}

