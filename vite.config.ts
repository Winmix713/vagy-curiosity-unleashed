// vite.config.ts - JAVÍTOTT VÁLTOZAT
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// A 'lovable-tagger' importot innen töröld ki
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
// Alakítsd át a default exportot egy async függvénnyé
export default defineConfig(async () => {
  // Használd a dinamikus importot az ESM csomag betöltésére
  const { componentTagger } = await import('lovable-tagger');

  // Most már használhatod a betöltött componentTagger-t
  return {
    plugins: [
      react(),
      componentTagger(), // Itt add hozzá a betöltött plugint
      tsconfigPaths()
    ],
    // ... esetleges egyéb Vite konfigurációs beállítások
  };
});
