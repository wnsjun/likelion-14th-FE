import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      quiet: true, // Tailwind 경고 메시지 비활성화
    })
  ],
  server: {
    port: 3000,
  },
});
