import path from 'path';

// Vite
import { defineConfig, UserConfig } from 'vite';

// Svelte
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

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
  // Common options for both development and production
  const commonOptions = {
    plugins: [
      typeScript({
        tsconfig: 'tsconfig.json',
      }),
      svelte({
        preprocess: sveltePreprocess(),
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
      postcss: {
        plugins: [
          tailwindcss({ config: 'tailwind.config.js' }),
          autoprefixer(),
        ],
      },
    },
    root: '.',
  } as UserConfig;

  // Development mode
  if (mode === 'development') {
    return {
      ...commonOptions,
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
      ...commonOptions,
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
