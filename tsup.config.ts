import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "es2020",
  sourcemap: true,
  clean: true,
  splitting: false,
  dts: false,
});