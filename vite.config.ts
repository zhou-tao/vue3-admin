import type { ConfigEnv } from 'vite'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/vite/plugins'
import { createProxy } from './build/vite/proxy'
import { createOptimizeDeps } from './build/vite/optimize-deps'
import { envParse } from './build/utils'
import autoprefixer from 'autoprefixer'

export default ({ mode }: ConfigEnv) => {
  const envDir = resolve(__dirname, 'env')
  const env = envParse(loadEnv(mode, envDir) as ImportMetaEnv)
  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE
  } = env
  return defineConfig({
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@c': resolve(__dirname, 'src/components'),
        '@h': resolve(__dirname, 'src/hooks'),
        '#': resolve(__dirname, 'types')
      }
    },
    envDir,
    server: {
      port: VITE_PORT,
      host: true,
      open: true,
      https: false,
      proxy: createProxy()
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger', 'alert'] : []
    },
    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue': ['vue'],
            'vue-router': ['vue-router'],
            'pinia': ['pinia'],
            'element-plus': ['element-plus'],
            'axios': ['axios'],
            'nprogress': ['nprogress']
          }
        },
      }
    },
    css: {
      devSourcemap: false,
      postcss: {
        plugins: [
          autoprefixer
        ]
      },
    },
    plugins: createVitePlugins(env, mode === 'production'),
    // fix(vite): optimized dependencies changed. reloading
    optimizeDeps: createOptimizeDeps()
  })
}
