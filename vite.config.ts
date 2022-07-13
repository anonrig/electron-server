import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "electron-server",
    },
    rollupOptions: {
      external: ["electron"],
      output: {
        globals: {
          electron: "electron",
        },
      },
      plugins: [],
    },
  },
  optimizeDeps: {
    include: ["electron"],
  },
});
