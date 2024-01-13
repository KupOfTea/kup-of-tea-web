import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        suite: ['SUITE Variable', 'sans-serif'],
      },
      colors: {
        background: 'hsl(0, 0%, 100%)', // --base-white
        foreground: 'hsl(240, 2%, 9%)', // --base-900
        hover: 'hsl(240, 9%, 98%)', // --base-50
        primary: 'hsl(36, 95%, 53%)', // --brand-500
        primaryForeground: 'hsl(0, 0%, 100%)', // --base-white
        primaryHover: 'hsl(36, 84%, 45%)', // --brand-600
        secondary: 'hsl(240, 9%, 98%)', // --base-50
        secondaryForeground: 'hsl(240, 4%, 46%)', // --base-500
        secondaryHover: 'hsl(0, 0%, 96%)', // --base-100
        muted: 'hsl(0, 0%, 96%)', // --base-100
        mutedForeground: 'hsl(240, 4%, 84%)', // --base-300
        destructive: 'hsl(350, 89%, 68%)', // --rose-500
        destructiveForeground: 'hsl(0, 0%, 100%)', // --base-white
        destructiveHover: 'hsl(350, 59%, 48%)', // --rose-600
        border: 'hsl(0, 0%, 96%)', // --base-100
        input: 'hsl(240, 4%, 90%)', // --base-200
        brand: {
          50: 'hsl(35, 100%, 98%)',
          100: 'hsl(37, 96%, 91%)',
          200: 'hsl(36, 96%, 81%)',
          300: 'hsl(36, 95%, 74%)',
          400: 'hsl(36, 95%, 62%)',
          500: 'hsl(36, 95%, 53%)',
          600: 'hsl(36, 84%, 45%)',
          700: 'hsl(36, 84%, 37%)',
          800: 'hsl(36, 84%, 27%)',
          900: 'hsl(36, 85%, 21%)',
        },
        base: {
          50: 'hsl(240, 9%, 98%)',
          100: 'hsl(0, 0%, 96%)',
          200: 'hsl(240, 4%, 90%)',
          300: 'hsl(240, 4%, 84%)',
          400: 'hsl(240, 3%, 65%)',
          500: 'hsl(240, 4%, 46%)',
          600: 'hsl(240, 4%, 33%)',
          700: 'hsl(240, 4%, 26%)',
          800: 'hsl(240, 4%, 15%)',
          900: 'hsl(240, 2%, 9%)',
          white: 'hsl(0, 0%, 100%)',
          black: 'hsl(0, 0%, 0%)',
        },
        rose: {
          400: 'hsl(350, 89%, 60%)',
          500: 'hsl(350, 89%, 68%)',
          600: 'hsl(350, 59%, 48%)',
        },
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '24px',
        xl: '48px',
      },
      screens: {
        afterMobileMaxWidth: '513px',
      },
    },
  },
  plugins: [],
}
export default config
