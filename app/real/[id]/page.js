import { notFound } from "next/navigation";
import TunnelGallery from "@/components/pages/TunnelGallery";
import { getGalleries, getGallery } from "@/lib/galleries";

export function generateStaticParams() {
  // 建置時由 Node.js 掃描實體作品資料夾，預先產生所有展間網址。
  return getGalleries("real").map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const gallery = getGallery("real", id);
  return { title: gallery ? `${gallery.name} · 實` : "找不到展間" };
}

export default async function RealSubGalleryPage({ params }) {
  // Next.js 16 的動態路由參數是 Promise，因此需要先 await。
  const { id } = await params;
  const gallery = getGallery("real", id);
  if (!gallery) notFound();

  return <TunnelGallery gallery={gallery} />;
}
