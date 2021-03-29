module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class' 
  theme: {
    extend: {
      colors: {
        'theme-colors': {
          'orange': '#E77518',
          'purple': '#5b3ba2',
          'blue': '#3c61a4',
          'green': '#c4cd50'
        },

        'theme-red': {
          '50': '#fdf4f5',
          '100': '#fbe9eb',
          '200': '#f6c9cc',
          '300': '#f0a8ad',
          '400': '#e46770',
          '500': '#d92632',
          '600': '#c3222d',
          '700': '#a31d26',
          '800': '#82171e',
          '900': '#6a1319'
        },
        'theme-orange': {
          '50': '#fffaf4',
          '100': '#fef4e9',
          '200': '#fde4c7',
          '300': '#fcd3a5',
          '400': '#f9b362',
          '500': '#f7921e',
          '600': '#de831b',
          '700': '#b96e17',
          '800': '#945812',
          '900': '#79480f'
        },
        'theme-magenta': {
          '50': '#fdf3f7',
          '100': '#fbe7ee',
          '200': '#f4c2d5',
          '300': '#ed9ebb',
          '400': '#e05588',
          '500': '#d30c55',
          '600': '#be0b4d',
          '700': '#9e0940',
          '800': '#7f0733',
          '900': '#67062a'
        },
        'theme-grey': {
          '50': '#f7f7f7',
          '100': '#eff0f0',
          '200': '#d8d8d9',
          '300': '#c1c1c2',
          '400': '#929394',
          '500': '#636466',
          '600': '#595a5c',
          '700': '#4a4b4d',
          '800': '#3b3c3d',
          '900': '#313132'
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}