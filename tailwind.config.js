/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          950: '#022c22',
          900: '#064e3b',
          800: '#065f46',
          700: '#047857',
          600: '#059669',
          500: '#10b981',
          400: '#34d399',
          300: '#6ee7b7',
          200: '#a7f3d0',
          100: '#d1fae5',
          50: '#f0fdf4',
        },
        backg: {
          950: '#09090b',
          900: '#18181b',
          800: '#27272a',
          700: '#3f3f46',
          600: '#52525b',
          500: '#71717a',
          400: '#a1a1aa',
          300: '#d4d4d8',
          200: '#e4e4e7',
          100: '#f4f4f5',
          50: '#fafafa',
        },
        font: {
          'dark': '#18181b',
          'light': '#e4e4e7'
        }
      },
      scale: {
        '70': '.7',
        '60': '.6',
      },
      fontFamily: {
        sans: ["Ubuntu"],
        serif: ["Ubuntu"],
        mono: ["Ubuntu"],
        display: ["Ubuntu"],
        body: ["Ubuntu"]
      },
      stroke: theme => ({
        'primary': theme('colors.primary'),
        'font': theme('colors.font'),
        'white': 'white',
      }),
      fill: theme => ({
        'primary': theme('colors.primary'),
        'font': theme('colors.font'),
        'white': 'white',
      }),
      spacing: {
        '22.5': '5.625',
        '30': '7.5rem',
        '108': '27rem',
        '120': '30rem',
        '132': '33rem',
        '144': '36rem',
        '156': '39rem',
        '168': '42rem',
        '180': '45rem',
        '192': '48rem',
        '204': '51rem',
        '216': '54rem',
        '228': '57rem',
        '240': '60rem',
        '252': '63rem',
        '264': '66rem',
        '276': '69rem',
        '288': '72rem',
        '300': '75rem',
        '312': '78rem',
        '324': '81rem',
        '336': '84rem',
        '348': '87rem',
        '360': '90rem',
        '372': '93rem',
      },
      screens: {
        '2xs': '360px',
        'xs': '414px',
      },
      dropShadow: {
        'flat': '0.4rem 0.4rem #00000022',
        'flat-sm': '0.3rem 0.3rem #00000022',
      },
    },
  },
  plugins: [],
}

