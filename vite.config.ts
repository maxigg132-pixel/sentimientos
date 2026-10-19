import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function videoStoragePlugin(): Plugin {
  return {
    name: 'video-storage-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/upload-video') && req.method === 'POST') {
          const urlObj = new URL(req.url, 'http://localhost:3000');
          const slotId = urlObj.searchParams.get('slot') || 'video-1';
          const publicDir = path.resolve(__dirname, 'public', 'videos');
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }
          const filePath = path.join(publicDir, `${slotId}.mp4`);
          const fileStream = fs.createWriteStream(filePath);
          req.pipe(fileStream);
          fileStream.on('finish', () => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, url: `/videos/${slotId}.mp4` }));
          });
          fileStream.on('error', (err) => {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          });
          return;
        }

        if (req.url === '/api/videos-status' && req.method === 'GET') {
          const publicDir = path.resolve(__dirname, 'public', 'videos');
          const available: Record<string, string> = {};
          for (let i = 1; i <= 4; i++) {
            const slotId = `video-${i}`;
            const p = path.join(publicDir, `${slotId}.mp4`);
            if (fs.existsSync(p)) {
              available[slotId] = `/videos/${slotId}.mp4`;
            }
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ videos: available }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), videoStoragePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
