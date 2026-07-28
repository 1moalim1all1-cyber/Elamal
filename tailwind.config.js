/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#10242B",
          50: "#EBF0F0",
          100: "#CFDBDC",
          200: "#9FB7B9",
          300: "#6E9295",
          400: "#3E6E72",
          500: "#10242B", // primary dark
          600: "#0D1E23",
          700: "#0A171B",
          800: "#071013",
          900: "#04090B",
        },
        petrol: {
          DEFAULT: "#0F5C5A",
          50: "#E6F2F1",
          100: "#C0DEDC",
          200: "#8FC3C0",
          300: "#5EA8A3",
          400: "#2E8C86",
          500: "#0F5C5A", // brand primary
          600: "#0C4A48",
          700: "#093836",
          800: "#062524",
          900: "#031312",
        },
        amber: {
          DEFAULT: "#E8A33D",
          50: "#FDF5E9",
          100: "#FAE6C4",
          200: "#F5CD89",
          300: "#F0B44E",
          400: "#E8A33D",
          500: "#D68C1F",
          600: "#AD7019",
          700: "#835413",
          800: "#5A390D",
          900: "#301D07",
        },
        coral: {
          DEFAULT: "#D9573F",
          50: "#FBEAE6",
          100: "#F4C9C0",
          200: "#EAA091",
          300: "#E07862",
          400: "#D9573F",
          500: "#C13F27",
          600: "#9A321F",
          700: "#732518",
          800: "#4D1810",
          900: "#260C08",
        },
        plaster: {
          DEFAULT: "#F6F1E7",
          100: "#FFFFFF",
          200: "#F6F1E7",
          300: "#EDE4D0",
        },
        stone: {
          DEFAULT: "#8A8478",
        },
      },
      fontFamily: {
        display: ["Almarai", "sans-serif"],
        body: ["Cairo", "sans-serif"],
      },
      backgroundImage: {
        "brush-divider":
          "linear-gradient(115deg, transparent 48%, currentColor 48%, currentColor 52%, transparent 52%)",
      },
    },
  },
  plugins: [],
};
