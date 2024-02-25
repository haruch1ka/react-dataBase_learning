import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./src/test/_setupTests.ts"],
    globals: true,
  },
});
