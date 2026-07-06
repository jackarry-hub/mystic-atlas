import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(function (_a) {
    var mode = _a.mode;
    return ({
        base: mode === "github-pages" ? "/mystic-atlas/" : "/",
        plugins: [react()],
        server: {
            host: "127.0.0.1",
            port: 5173
        }
    });
});
