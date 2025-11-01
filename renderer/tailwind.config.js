module.exports = {
  content: ['./renderer/pages/**/*.{js,ts,jsx,tsx}', './renderer/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        metroBold: ['MetroBold', './renderer/fonts/Metropolis-Bold.otf'],
        metroMedium: ['MetroMedium', './renderer/fonts/Metropolis-Medium.otf'],
        metroRegular: ['MetroRegular', './renderer/fonts/Metropolis-Regular.ttf'],
      },
      colors: {
        lightBg: "##f3f7fa",
        darkBg: "#141619",

        lightBorder: "#8c9ac8",
        darkBorder: "#373c42",

        lightText: "#141414",
        darkText: "#ede8f5",

        btnPrimary: "#875ca5",
        btnSecondary: "#c50900",

        secondry: "#7091e6",
        accent: "#747fb7",

        primary: {
          50: '#F0FDF5',
          100: '#DCFCE8',
          200: '#BCF6D2',
          300: '#87EEB0',
          400: '#45DB82',
          500: '#24C365',
          600: '#18A150',
          700: '#167F41',
          800: '#176437',
          900: '#155230',
          950: '#052E18',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#c4fcef',
          200: '#96f9e4',
          300: '#5aeed4',
          400: '#28d9c0',
          500: '#0fbda7',
          600: '#099888',
          700: '#0c796e',
          800: '#0f6059',
          900: '#11504a',
          950: '#03302e',
        },
      },
    },
  },
  plugins: [],
};
