/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      width: {
        'desktop': '40%',      // Largura padrão para telas maiores
        'mobile': '100%',       // Largura que ocupa a tela inteira em dispositivos móveis
      },

      colors: {
        primaryBlue: '#2A56ED',      // Azul primário
        secondaryBlue: '#2A5EAD',    // Azul secundário
        accentBlue: '#1D437A',       // Azul de destaque
        gray: '#E6E6E7',             // Cinza
        dark: '#14141C',             // Cinza claro
        cancelRed: '#FB3C3E',        // Vermelho de cancelar
        whiteBoard: '#FFFFFF'
      },

      screens:{
        vs: "410px",
      }
    },
  },
  plugins: [
     require('flowbite/plugin')
  ],
}