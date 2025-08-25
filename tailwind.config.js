// tailwind.config.js
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0096D6", // azul logo CERROS
          light:   "#40B8E0", // azul claro (hover)
          dark:    "#1C1C1C", // negro tipografía
          gray:    "#8C8C8C"  // gris montañas
        }
      }
    }
  },
  plugins: [],
};
