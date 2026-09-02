import RealGallery from "@/components/pages/RealGallery";
import { getGalleries } from "@/lib/galleries";

export const metadata = { title: "實 · 攝影作品" };

export default function RealGalleryPage() {
  return <RealGallery collections={getGalleries("real")} />;
}
