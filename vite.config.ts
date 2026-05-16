import fs from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const assetDirectory = path.resolve(__dirname, "assets");

function contentTypeFor(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

function rootAssetsPlugin() {
  return {
    name: "root-assets-plugin",
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use((request, response, next) => {
        const requestUrl = request.url;

        if (!requestUrl?.startsWith("/assets/")) {
          next();
          return;
        }

        const filePath = path.resolve(assetDirectory, requestUrl.slice("/assets/".length));

        if (!filePath.startsWith(assetDirectory) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          next();
          return;
        }

        response.setHeader("Content-Type", contentTypeFor(filePath));
        fs.createReadStream(filePath).pipe(response);
      });
    },
    closeBundle() {
      if (!fs.existsSync(assetDirectory)) {
        return;
      }

      const buildAssetsDirectory = path.resolve(__dirname, "dist/assets");
      fs.mkdirSync(buildAssetsDirectory, { recursive: true });
      fs.cpSync(assetDirectory, buildAssetsDirectory, { recursive: true });
    }
  };
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        piiTownHall: path.resolve(__dirname, "pii_townhall_v8.html")
      }
    }
  },
  plugins: [react(), rootAssetsPlugin()]
});
