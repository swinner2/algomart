/* eslint-disable @typescript-eslint/no-var-requires */
const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default
const plugin = require('tailwindcss/plugin')
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const path = require('path')

const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`
}

const colors = require('tailwindcss/colors')

module.exports = {
  // Keep JIT disabled for now. Enabling it will break the custom font loading.
  // mode: 'jit',
  purge: {
    // tree-shaking unused styles
    content: [
      path.join(__dirname, 'src', '**', '*.{js,ts,jsx,tsx,css}'),
      ...createGlobPatternsForDependencies(
        __dirname,
        '**/*.{js,ts,jsx,tsx,css}'
      ),
    ],
    css: [path.join(__dirname, 'src', '**', '*.css')],
  },
  darkMode: 'class', // or false, 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'pack-texture': "url('/images/textures/pack-texture.jpg')",
      },
      borderRadius: {
        sm: '4px',
        '2.5xl': '1.1rem',
      },
      borderWidth: {
        1: '1px',
        6: '6px',
        20: '20px',
      },
      boxShadow: {
        medium: '0px 1px 10px rgba(0, 0, 0, 0.15)',
        large: '0px 5px 40px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        purple: {
          600: '#9757D7',
        },
        indigo: {
          600: '#3772FF',
        },
        green: {
          600: '#91ff00',
          800: '#45B26B', // badge background
        },
        yellow: {
          400: '#dcd48b',
        },
        blue: {
          200: '#40bdcd8f',
          400: '#40BDCD',
          600: '#18A5D8',
          800: '#00fdff',
          1000: '#01224a',
        },
        darkBlue: {
          100: '#001b24',
        },
        pink: {
          400: '#309AC0',
          600: '#EF466F', // Primary Buttons
        },
        gray: {
          50: '#FCFCFD', // Icons/Typography
          100: '#E6E8EC', // Pill Active - Follow Page
          200: '#B1B5C3', // Typography "Creator"
          400: '#777E90', // Icons/Typography
          600: '#353945', // Pill Buttons/Borders
          800: '#23262F', // Favorite Button
          900: '#0b0b1d', // Background
        },
        base: {
          errorRed: '#AC0000',
          green: '#02FBC2',
          priceGreen: '#33C500',
          teal: '#12DCC5',
          brand: {
            50: '#82dab0',
            100: '#82dab0',
            200: '#69d3a0',
            300: '#50cb90',
            400: '#C5F1DD',
            500: '#9FE7C7',
            600: '#65D9A5',
            700: '#3ECF8E',
            800: '#24b47e', // green-500 in dashboard
            900: '#2c9c6a',
          },
          purple: {
            600: '#9757D7',
          },
          indigo: {
            600: '#3772FF',
          },
          blue: {
            400: '#68D7FF',
            600: '#00B0F0',
            800: '#309AC0',
          },
          pink: {
            400: '#309AC0',
            600: '#EF466F', // Primary Buttons
          },
          error: generateColorClass('error'),
          price: generateColorClass('price'),
          border: generateColorClass('border'),

          bg: generateColorClass('bg'),
          bgCard: generateColorClass('bgCard'),
          bgPanel: generateColorClass('bgPanel'),
          bgNotice: generateColorClass('bgNotice'),

          textPrimary: generateColorClass('textPrimary'),
          textSecondary: generateColorClass('textSecondary'),
          textTertiary: generateColorClass('textTertiary'),
          textDisabled: generateColorClass('textDisabled'),

          gray: {
            50: '#FCFCFD', // Icons/Typography
            100: '#E6E8EC', // Pill Active - Follow Page
            200: '#B1B5C3', // Typography "Creator"
            400: '#777E90', // Icons/Typography
            600: '#353945', // Pill Buttons/Borders
            800: '#23262F', // Favorite Button
            900: '#0b0b1d', // Background
            dark: colors.gray['500'],
            text: colors.coolGray['50'],
            nav: '#e5e5e5',
            notice: '#F9F8F9',
            medium: '#747F8F',
            light: '#B6BECB',
            border: '#DADCDF',
            bg: '#ECECEC',
          },
        },
        action: {
          primary: generateColorClass('actionPrimary'),
          primaryContrastText: generateColorClass('actionPrimaryContrastText'),
          secondary: generateColorClass('actionSecondary'),
          secondaryContrastText: generateColorClass(
            'actionSecondaryContrastText'
          ),
          accent: generateColorClass('actionAccent'),
        },
      },
      fontFamily: {
        poppins: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        'dm-sans': [
          'DM Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      height: {
        thumb: '100px',
      },
      margin: {
        15: '3.55rem',
      },
      minHeight: {
        thumb: '80px',
      },
      minWidth: {
        checkout: '520px',
        700: '700px',
        880: '880px',
      },
      maxWidth: {
        520: '520px',
        700: '700px',
        880: '880px',
        wrapper: '1100px',
      },
      width: {
        250: '250px',
        xxs: '150px',
        '2/3': '66.666667%',
        '80p': '80%',
        '70p': '70%',
        thumb: '100px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    // Enables specifying border colors per-side i.e., border-t-green-100 for a light green top border
    plugin(({ addUtilities, theme }) => {
      const colors = flattenColorPalette(theme('colors'))
      delete colors['default']
      const colorMap = Object.keys(colors).map((colorName) => {
        const color =
          typeof colors[colorName] === 'function'
            ? colors[colorName](colorName)
            : colors[colorName]
        return {
          [`.border-t-${colorName}`]: { borderTopColor: color },
          [`.border-r-${colorName}`]: { borderRightColor: color },
          [`.border-b-${colorName}`]: { borderBottomColor: color },
          [`.border-l-${colorName}`]: { borderLeftColor: color },
        }
      })
      const utilities = Object.assign({}, ...colorMap)

      addUtilities(utilities, ['responsive', 'hover'])
    }),
  ],
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
    },
  },
}
