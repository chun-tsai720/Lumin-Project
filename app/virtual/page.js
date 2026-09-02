import VirtualGallery from "@/components/pages/VirtualGallery";
import { getGalleries } from "@/lib/galleries";

export const metadata = { title: "虛 · 數位作品" };

export default function VirtualGalleryPage() {
  return <VirtualGallery collections={getGalleries("virtual")} />;
}
