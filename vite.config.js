import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
var assetDirectory = path.resolve(__dirname, "assets");
function contentTypeFor(filePath) {
    var extension = path.extname(filePath).toLowerCase();
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
        configureServer: function (server) {
            server.middlewares.use(function (request, response, next) {
                var requestUrl = request.url;
                if (!(requestUrl === null || requestUrl === void 0 ? void 0 : requestUrl.startsWith("/assets/"))) {
                    next();
                    return;
                }
                var filePath = path.resolve(assetDirectory, requestUrl.slice("/assets/".length));
                if (!filePath.startsWith(assetDirectory) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
                    next();
                    return;
                }
                response.setHeader("Content-Type", contentTypeFor(filePath));
                fs.createReadStream(filePath).pipe(response);
            });
        },
        closeBundle: function () {
            if (!fs.existsSync(assetDirectory)) {
                return;
            }
            var buildAssetsDirectory = path.resolve(__dirname, "dist/assets");
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
