import path from 'path';

// Vite
import { defineConfig, CSSOptions, UserConfig } from 'vite';

// Svelte
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import type { AutoPreprocessOptions } from 'svelte-preprocess/dist/types';

// NeutralinoJS
import neutralinoConfig from './neutralino.config.json';

// Typescript
import typeScript from '@rollup/plugin-typescript';
import tsConfigPaths from 'vite-tsconfig-paths';

// HTML
import { createHtmlPlugin } from 'vite-plugin-html';

// Tailwind CSS
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Development mode
  if (mode === 'development') {
    return {
      ...getCommonOptions(),
      server: {
        port: 8080,
      },
    } as UserConfig;
  }

  // Production mode
  else if (mode === 'production') {
    const outDir = path.resolve(
      __dirname,
      (neutralinoConfig?.documentRoot || neutralinoConfig?.cli?.resourcesPath || 'bundle')
        // Remove leading slash
        .replace(/^\//, './'),
    );

    return {
      ...getCommonOptions(),
      build: {
        // Build as a single file
        lib: {
          entry: 'src/main.ts',
          name: neutralinoConfig.applicationId,
          // CommonJS
          formats: ['cjs'],
          fileName: 'index',
        },
        // Output directory
        outDir: outDir,
        sourcemap: true,
      },
    } as UserConfig;
  } else {
    throw new Error('Unknown mode');
  }
});

// Common options for both development and production
function getCommonOptions(): UserConfig {
  return {
    plugins: [
      typeScript({
        tsconfig: 'tsconfig.json',
      }),
      svelte({
        preprocess: sveltePreprocess({
          postcss: getPostcssOptions(),
        }),
      }),
      // Auto import paths from tsconfig.json
      tsConfigPaths({
        // Allow all extensions
        loose: true,
      }),
      createHtmlPlugin({
        // Change default template
        template: 'src/index.html',
      }),
    ],
    css: {
      postcss: getPostcssOptions(),
    },
    root: '.',
  };
}

// Common postcss options
function getPostcssOptions(): AutoPreprocessOptions['postcss'] & CSSOptions['postcss'] {
  return {
    plugins: [
      tailwindcss({ config: 'tailwind.config.js' }),
      autoprefixer(),
    ],
  };
}
