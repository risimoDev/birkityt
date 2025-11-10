/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.php"],
  theme: {
    fontFamily: {
      mainSans: {}
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
        clrLightBrown: '#c9b0a1'
      }
    },
  },
  plugins: [

  ],
}

