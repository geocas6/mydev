import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// La propiedad `base` debe coincidir con el nombre exacto de tu repositorio en GitHub.
// Cámbiala a: '/nombre-de-tu-repo/'
export default defineConfig({
  plugins: [react()],
  base: '/mydev/',
})
