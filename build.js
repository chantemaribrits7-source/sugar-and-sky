const fs = require("fs");
const path = require("path");

const root = __dirname;
const template = fs.readFileSync(path.join(root, "template.html"), "utf8");
const data = JSON.parse(fs.readFileSync(path.join(root, "content", "site.json"), "utf8"));

const cardBlock = template.match(/<!--GLIDER_CARD_START-->([\s\S]*?)<!--GLIDER_CARD_END-->/);
const cardTemplate = cardBlock[1];
const gliders = data.gliders || [];
const cardsHtml = gliders.length
  ? gliders
      .map((glider) => {
        let card = cardTemplate;
        for (const [key, value] of Object.entries(glider)) {
          card = card.replaceAll(`{{glider_${key}}}`, String(value));
        }
        return card;
      })
      .join("\n")
  : `<p class="no-gliders">No gliders are currently available. Check back soon or contact us to be notified.</p>`;

let html = template.replace(cardBlock[0], cardsHtml);
for (const [key, value] of Object.entries(data)) {
  if (typeof value !== "string" && typeof value !== "number") continue;
  html = html.replaceAll(`{{${key}}}`, String(value));
}

fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.mkdirSync(path.join(root, "public", "admin"), { recursive: true });
fs.writeFileSync(path.join(root, "public", "index.html"), html, "utf8");
fs.copyFileSync(path.join(root, "admin", "index.html"), path.join(root, "public", "admin", "index.html"));
fs.copyFileSync(path.join(root, "admin", "config.yml"), path.join(root, "public", "admin", "config.yml"));
fs.copyFileSync(path.join(root, "assets", "care-sheet.pdf"), path.join(root, "public", "care-sheet.pdf"));
fs.cpSync(path.join(root, "assets", "images"), path.join(root, "public", "images"), { recursive: true });

