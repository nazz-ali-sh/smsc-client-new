import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    extend: {
      colors: {
        buttonPrimary: '#35C0ED',
        purple: '#E6E7FF',
        purple1: '#26C6F929',
        sky: '#CBEFFB',
        borderprimary: '#E0E0E0',
        bordercolor: '#F1F1F3',
        bordercolor1: '#35C0ED',
        darkblue: '#1F4E8D',
        textGray: '#696969'
        // textprimary: '#6B7280'
        // textsecondar: '#111827',
      }
    }
  }
}

export default config
