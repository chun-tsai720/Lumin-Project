import { notFound } from "next/navigation";
import TunnelGallery from "@/components/pages/TunnelGallery";
import { getGalleries, getGallery } from "@/lib/galleries";

export function generateStaticParams() {
  // 建置時由 Node.js 掃描虛擬作品資料夾，預先產生所有展間網址。
  return getGalleries("virtual").map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const gallery = getGallery("virtual", id);
  return { title: gallery ? `${gallery.name} · 虛` : "找不到展間" };
}

export default async function VirtualSubGalleryPage({ params }) {
  const { id } = await params;
  const gallery = getGallery("virtual", id);
  if (!gallery) notFound();

  return <TunnelGallery gallery={gallery} />;
}
