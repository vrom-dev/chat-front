import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const vueSvgPlugin = require('vite-plugin-vue-svg')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSvgPlugin()
  ]
})
