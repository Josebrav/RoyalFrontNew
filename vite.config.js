import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_URL || 'https://api.royalgames.lat'

  return {
    plugins: [react()],
    assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP', '**/*.GIF'],
    server: {
      // Mismo proxy que el rewrite de vercel.json en producción: /auth/* pasa por el propio
      // origen (acá localhost) en vez de pegarle cross-site al backend, así la cookie httpOnly
      // del refresh token queda de "primera parte" también en desarrollo.
      proxy: {
        '/auth': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
