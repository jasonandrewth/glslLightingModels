import checker from 'vite-plugin-checker'
// import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [checker({ typescript: true })], // e.g. use TypeScript check
  resolve: { preserveSymlinks: true },
  assetsInclude: ['**/*.jpg', '**/*.glsl', '**/*.obj', '**/*.ply', '**/*.off']
})
