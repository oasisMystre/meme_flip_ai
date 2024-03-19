import {
  defineConfig,
  transformerDirectives,
  presetWebFonts,
  presetUno,
} from "unocss";

export default defineConfig({
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: "#0F4E88",
      secondary: "#05E7FB",
      tetiary: "#010F81",
      dark: "#242364",
    },
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Nunito Sans",
        lato: "Noto Sans",
      },
    }),
  ],
});
