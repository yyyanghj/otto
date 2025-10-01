import { defineConfig } from 'wxt'
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  outDir: 'dist',
  vite: () => ({
    plugins: [
      tailwindcss() as never,
    ],
  }),
  manifest: ({ mode }) => ({
    name: mode === 'production' ? 'Otto' : 'Otto (Development)',
    permissions: [
      'management',
    ],
    icons: {
      16: 'icon/16.png',
      32: 'icon/32.png',
      48: 'icon/48.png',
      64: 'icon/64.png',
      96: 'icon/96.png',
      128: 'icon/128.png',
    },
    action: {
      default_title: mode === 'production' ? 'Otto' : 'Otto (Development)',
      default_popup: 'popup/index.html',
    },
  }),
})
