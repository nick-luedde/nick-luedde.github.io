import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'docs',
    // don't minify to leave code as written in the build output
    minify: false
  }
});