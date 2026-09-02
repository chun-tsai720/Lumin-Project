import galleryManifest from "@/data/gallery-manifest.json";

// 頁面只讀取建置前產生的小型 JSON，不在 Vercel Function 中存取檔案系統。
export function getGalleries(kind) {
  return galleryManifest[kind] ?? [];
}

export function getGallery(kind, id) {
  const safeId = id?.toLowerCase();
  if (!safeId || !/^[a-z0-9-]+$/.test(safeId)) return null;
  return getGalleries(kind).find((gallery) => gallery.id === safeId) ?? null;
}
