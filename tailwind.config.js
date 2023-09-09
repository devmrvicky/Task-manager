// tailwind.config.js

export const theme = {
  extend: {
    // Customize heading styles
    typography: {
      h1: {
        fontSize: "4rem",
        fontWeight: "bold", // Your desired font weight
      },
      h2: {
        fontSize: "3rem",
        fontWeight: "semibold",
      },
      // Define styles for other heading levels as needed
    },
  },
};
export const plugins = [
  require("@tailwindcss/typography"), // Enable typography plugin
];
