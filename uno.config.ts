import {
  defineConfig,
  transformerDirectives,
  presetWebFonts,
  presetUno,
} from "unocss";

export default defineConfig({
  transformers: [transformerDirectives()],
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
