// GitHub Pages has no SPA fallback: a direct visit to /login is answered by 404.html
// (HTTP 404 + redirect), which search engines and link previews treat as a missing page.
// Writing dist/<route>.html makes Pages answer those URLs with HTTP 200 directly.
import { copyFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const app = readFileSync("src/App.tsx", "utf8");
// Top-level routes only: a nested page would need a folder next to <route>.html,
// and Pages then prefers the folder. Nested and dynamic routes keep using 404.html.
const routes = [...app.matchAll(/path="(\/[^"*:/]+)"/g)].map((m) => m[1]);

for (const route of new Set(routes)) {
  const target = join(dist, `${route.slice(1)}.html`);
  copyFileSync(join(dist, "index.html"), target);
}
console.log(`spa-routes: wrote ${new Set(routes).size} route pages`);
