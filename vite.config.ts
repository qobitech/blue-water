import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      checker({ typescript: true, eslint: { lintCommand: 'eslint ./src' } })
    ],
    define: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...Object.keys(env).reduce((prev: any, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key])
        return prev
      }, {})
    },
    build: {
      outDir: 'build' // Specify the desired output directory
    }
  }
})
