import { generateAssets } from "@vite-pwa/assets-generator/api/generate-assets";
import { instructions } from "@vite-pwa/assets-generator/api/instructions";
import { readFile } from "node:fs/promises";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
    lib: {
      formats: ["es"],
      entry: "src/content.ts",
      name: "content",
      fileName: "content",
    },
  },
  plugins: [
    {
      name: "assets",
      apply: "build",
      async writeBundle() {
        const options = await instructions({
          imageResolver: () => readFile("public/vertec.png"),
          imageName: "vertec.png",
          originalName: "icon",
          htmlLinks: { xhtml: false, includeId: false },
          preset: {
            transparent: {
              sizes: [48, 128, 256, 512],
            },
            maskable: { sizes: [] },
            apple: { sizes: [] },
          },
        });
        await generateAssets(options, true, "dist", (e) => console.error(e));
      },
    },
  ],
});
