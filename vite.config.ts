import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/raycasting-demo/",
  plugins: [
    solid(),
    tailwindcss(),
  ],
})
