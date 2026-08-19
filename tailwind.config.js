/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        github: {
          bg: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          text: '#c9d1d9',
          secondary: '#8b949e',
          hover: '#1f2937',
          button: '#238636',
          buttonHover: '#2ea043',
          danger: '#da3633',
          success: '#3fb950',
          warning: '#d29922',
        }
      },
      screens: {
        'mobile': {'max': '768px'},
        'desktop': {'min': '769px'},
      }
    },
  },
  plugins: [],
}