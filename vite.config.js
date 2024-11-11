import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://clear-way.onrender.com',
        secure: false
        // target:'http://127.0.0.1:8000',
        // secure: false
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '../../components': path.resolve(__dirname, './src/components')
    }
  }
})
