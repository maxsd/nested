module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        blue: '#2bd4db',
        violet: '#e78ecb',
        orange: '#fdb84a',
        paleGrey: '#eaedf3',
        veryPaleGrey: '#f9fafc',
        darkGrey: '#969fb9',
      },
      fontFamily: {
        sregular: ['SofiaProRegular', 'Arial', 'sans-serif'],
        smedium: ['SofiaProMedium', 'Arial', 'sans-serif'],
        sbold: ['SofiaProBold', 'Arial', 'sans-serif'],
        slight: ['SofiaProLight', 'Arial', 'sans-serif'],
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
