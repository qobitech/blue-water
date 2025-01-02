import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...Object.keys(env).reduce((prev: any, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key])
        return prev
      }, {})
    }
  }
})
