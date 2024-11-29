/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      itim: ["Itim", "cursive"],
      podkova: ["Podkova", "serif"],
    },
    screens: {
      xxs: "5px",
      ss: "100px",
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      display: ["group-hover"],
      backgroundImage: {
        "hero-bg": "url('/src/assets/landingpage/bg.jpg')",
        "login-bg": "url('/src/assets/landingpage/bg-1.jpg')",
        "rest-bg": "url('/src/assets/landingpage/defaultrest.jpeg')",
        "burger-bg": "url('/src/assets/images/burger.webp')",
        "cuisine-bg": "url('/src/assets/images/cuisine.webp')",
        "pizza-bg": "url('/src/assets/images/pizza.webp')",
        "ramen-bg": "url('/src/assets/images/ramen.webp')",
        "promo-bg": "url('/src/assets/landingpage/promo.jpeg')",
        // "footer-texture": "url('/img/footer-texture.png')",
      },
      fontFamily: {
        logo: ["Moirai One", "sans-serif"],
        fast: ["Pacifico", "sans-serif"],
      },
    },
  },
  plugins: [],
};
