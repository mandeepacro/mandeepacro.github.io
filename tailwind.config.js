/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gray: '#B8B8B8',
        darkgrey:'#555555',
        white: '#fff',
        dark: '#1A1A1A',
        lightgray: '#BBBBBB',
        bordergrey:'#565656',
        green: '#61FF7A',
        yellow: '#E8FF8C',
        orange:'#FFB661',
        lightorange:'#FFBCAE',
        lightorange2: '#FFB09F',
        lightred:'#FF8C8C',
        purple:'#AA75FF',
        purplelight:'#E3D2FF',
        purplelight2: '#D0B3FF'
      },
      boxShadow:{
        sm:"0px 4px 6px rgba(0, 0, 0, 0.06)"
      },
      fontFamily: {
        syne: ["Syne, sans-serif"],
        dm: ["DM Sans, sans-serif"],
        code:["Azeret Mono, monospace"]
      },
      fontSize: {
        '7xl':'6.5rem'
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '6rem',
          '2xl': '10rem',
        },
        center: true
      },
    important: {},
      spacing:{
        'section':'22rem'
      },
      width:{
        "200":"55rem"
      },
      height:{
        "200":"55rem"
      },
      gridTemplateColumns: {
        'logos': 'minmax(400px, 1fr)',
      },
      transitionTimingFunction:{
        'in-out-circ':'cubic-bezier(0.85, 0, 0.15, 1)',
        'in-out-back':'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'in-out-expo':'cubic-bezier(0.87, 0, 0.13, 1)',
        'out-back':'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-cubic':'cubic-bezier(0.33, 1, 0.68, 1)'
      },

      keyframes: {
        fadeup: {
          '0%': { display:'none', transform:'translateY(25%)',opacity:0 },
          '100%': { display:'block',transform:'translateY(0)',opacity:1 }
        }
      },

      animation: {
        'fade-up': 'fadeup 800ms cubic-bezier(0.87, 0, 0.13, 1) forwards',
      }

    },
    plugins: [],
  }
}
