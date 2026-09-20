import path from 'path';
import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

const htmlInputs = glob.sync('./src/*.html').reduce((acc, file) => {
  const name = path.basename(file, '.html');
  acc[name] = path.resolve(file);
  return acc;
}, {});

export default defineConfig(({ command }) => {
  return {
    root: 'src',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    css: {
      postcss: {
        plugins: [
          SortCss({
            sort: 'mobile-first',
          }),
        ],
      },
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: htmlInputs,
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});
