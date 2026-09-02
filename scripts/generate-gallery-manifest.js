import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 只在開發或正式建置前執行：將 public 圖片整理成小型 JSON。
// 如此可避免 Vercel 把數 GB 原圖誤包進 Serverless Function。
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagePattern = /\.(?:avif|gif|jpe?g|png|webp)$/i;

const realMetadata = {
  huan: { name: "幻", en: "ILLUSION" },
  light: { name: "光", en: "GLOW" },
  heavy: { name: "重", en: "GRAVITY" },
  maze: { name: "迷", en: "MAZE" },
  reflect: { name: "映", en: "REFLECT" },
  ethereal: { name: "緲", en: "ETHEREAL" },
  shadow: { name: "影", en: "TRACE" },
  still: { name: "靜", en: "SILENCE" },
  crush: { name: "壓", en: "PRESSURE" },
  haze: { name: "霧", en: "MIST" },
};

const virtualNames = {
  "1990": "1990",
  afternoon: "AFTERNOON",
  "angel-devil": "ANGEL OR DEVIL",
  "angel-war": "ANGEL OF WAR",
  arch: "ARCH",
  athena: "ATHENA",
  blue: "BLUE",
  burger: "BURGER",
  "dark-fashion": "DARK FASHION",
  dream: "DREAM",
  fashion: "FASHION",
  flower: "FLOWER",
  "god-of-thunder": "GOD OF THUNDER",
  gothic: "GOTHIC",
  hades: "HADES",
  helen: "HELEN",
  "king-sea": "KING OF THE SEA",
  odin: "ODIN",
  "orange-fashion": "ORANGE FASHION",
  priest: "PRIEST",
  red: "RED",
  shiva: "SHIVA",
  "skull-fashion": "SKULL FASHION",
  "steampunk-girl": "STEAMPUNK GIRL",
  survive: "SURVIVE",
  valkyrie: "VALKYRIE",
  white: "WHITE",
};

function naturalCompare(left, right) {
  if (/^cover\./i.test(left)) return -1;
  if (/^cover\./i.test(right)) return 1;
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
}

function readGallery(kind, id) {
  const directory = path.join(projectRoot, "public", kind, id);
  const files = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imagePattern.test(entry.name))
    .map((entry) => entry.name)
    .sort(naturalCompare);

  const fallbackName = id.replaceAll("-", " ").toUpperCase();
  const metadata = kind === "real"
    ? realMetadata[id] ?? { name: fallbackName, en: fallbackName }
    : { name: virtualNames[id] ?? fallbackName, en: virtualNames[id] ?? fallbackName };

  return {
    id,
    kind,
    ...metadata,
    subtitle: kind === "real" ? "REALITY" : "VIRTUAL ENTITY",
    cover: files.find((file) => /^cover\./i.test(file)) ?? files[0],
    files,
  };
}

function readKind(kind, preferredOrder) {
  const root = path.join(projectRoot, "public", kind);
  const availableIds = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name);

  const orderedIds = [
    ...preferredOrder.filter((id) => availableIds.includes(id)),
    ...availableIds.filter((id) => !preferredOrder.includes(id)).sort(),
  ];
  return orderedIds.map((id) => readGallery(kind, id));
}

const manifest = {
  real: readKind("real", Object.keys(realMetadata)),
  virtual: readKind("virtual", Object.keys(virtualNames)),
};

const outputDirectory = path.join(projectRoot, "src", "data");
const outputPath = path.join(outputDirectory, "gallery-manifest.json");
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);

const imageCount = [...manifest.real, ...manifest.virtual]
  .reduce((total, gallery) => total + gallery.files.length, 0);
console.log(`Generated ${path.relative(projectRoot, outputPath)} for ${manifest.real.length + manifest.virtual.length} galleries and ${imageCount} images.`);
