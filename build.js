const fs = require("fs");
const path = require("path");

const root = __dirname;
const template = fs.readFileSync(path.join(root, "template.html"), "utf8");
const data = JSON.parse(fs.readFileSync(path.join(root, "content", "site.json"), "utf8"));

let html = template;
for (const [key, value] of Object.entries(data)) {
  html = html.replaceAll(`{{${key}}}`, String(value));
}

fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.writeFileSync(path.join(root, "public", "index.html"), html, "utf8");
fs.copyFileSync(path.join(root, "admin", "index.html"), path.join(root, "public", "admin", "index.html"));
fs.copyFileSync(path.join(root, "admin", "config.yml"), path.join(root, "public", "admin", "config.yml"));
