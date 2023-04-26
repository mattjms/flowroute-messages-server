import { defineConfig } from 'vite'
import FullReload from "vite-plugin-full-reload"
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
  clearScreen: false,
  plugins: [
    RubyPlugin(),
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'app/assets/stylesheets/quasar-variables.scss'
    }),
    FullReload(["config/routes.rb", "app/views/**/*"], { delay: 300 }),
  ],
})
