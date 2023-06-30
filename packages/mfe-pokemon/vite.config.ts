import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remotePokemon",
      filename: "remotePokemon.js",
      exposes: {
        "./Pokemons": "./src/modules/Pokemons",
        "./PokemonDetails": "./src/components/PokemonDetails/PokemonDetails",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
