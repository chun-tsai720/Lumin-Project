import "server-only";

import fs from "node:fs";
import path from "node:path";

// 這個模組只在 Node.js 伺服器端執行：直接讀取 public 作品資料夾，
// 因此新增照片後不需要再手動維護一份容易出錯的檔名陣列。
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

const realOrder = Object.keys(realMetadata);
const virtualOrder = Object.keys(virtualNames);

function getRoot(kind) {
  if (kind !== "real" && kind !== "virtual") {
    throw new Error(`Unsupported gallery kind: ${kind}`);
  }

  return path.join(process.cwd(), "public", kind);
}

function naturalCompare(left, right) {
  // 封面固定排第一，其餘採自然排序，避免 image10 排在 image2 前面。
  if (/^cover\./i.test(left)) return -1;
  if (/^cover\./i.test(right)) return 1;
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
}

function readImageFiles(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imagePattern.test(entry.name))
    .map((entry) => entry.name)
    .sort(naturalCompare);
}

function getMetadata(kind, id) {
  if (kind === "real") {
    return realMetadata[id] ?? { name: id.toUpperCase(), en: id.toUpperCase() };
  }

  const name = virtualNames[id] ?? id.replaceAll("-", " ").toUpperCase();
  return { name, en: name };
}

export function getGallery(kind, id) {
  // 動態路由的 id 只能包含安全字元，避免使用者藉網址跳出作品根目錄。
  const safeId = id?.toLowerCase();
  if (!safeId || !/^[a-z0-9-]+$/.test(safeId)) return null;

  const directory = path.join(getRoot(kind), safeId);
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) return null;

  const files = readImageFiles(directory);
  if (files.length === 0) return null;

  const metadata = getMetadata(kind, safeId);
  return {
    id: safeId,
    kind,
    ...metadata,
    subtitle: kind === "real" ? "REALITY" : "VIRTUAL ENTITY",
    cover: files.find((file) => /^cover\./i.test(file)) ?? files[0],
    files,
  };
}

export function getGalleries(kind) {
  // 先沿用策展順序；未來新增但尚未登記的資料夾會自動接在最後。
  const root = getRoot(kind);
  const preferredOrder = kind === "real" ? realOrder : virtualOrder;
  const availableIds = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name);

  const order = [
    ...preferredOrder.filter((id) => availableIds.includes(id)),
    ...availableIds.filter((id) => !preferredOrder.includes(id)).sort(),
  ];

  return order.map((id) => getGallery(kind, id)).filter(Boolean);
}
