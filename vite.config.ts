import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons';
import ViteComponents from 'vite-plugin-components';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),

    ViteComponents({
      extensions: ['vue', 'md'],

      customLoaderMatcher: id => id.endsWith('.md'),

      globalComponentsDeclaration: true,

      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: 'icon',
        }),
      ],
    }),

    ViteIcons({
      scale: 1,
    }),
  ],
  build: {
    watch: process.env.WATCH == '1' ? {} : null,
    rollupOptions: {
      input: {
        popup: 'popup/index.html',
      },
    },
  },
});
