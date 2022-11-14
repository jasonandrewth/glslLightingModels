import checker from 'vite-plugin-checker'
export default {
  plugins: [checker({ typescript: true })], // e.g. use TypeScript check
  resolve: { preserveSymlinks: true },
  assetsInclude: ['**/*.jpg', '**/*.glsl','**/*.obj','**/*.ply','**/*.off']
}
