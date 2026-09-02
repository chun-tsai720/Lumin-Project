import "./globals.css";

export const metadata = {
  title: {
    default: "映光 LUMIN",
    template: "%s | 映光 LUMIN",
  },
  description: "蔡濬守的實體攝影與虛擬創作數位作品集。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
