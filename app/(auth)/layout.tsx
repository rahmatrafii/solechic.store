import { Metadata } from "next";
import "../globals.css";
export const metadata: Metadata = {
  title: {
    default: "SoleChic.store",
    template: " %s | SoleChic.store",
  },
  description:
    "SoleChic.store, where every step is a statement. Elevate your style with our curated collection of trendy and elegant footwear. Discover the perfect blend of fashion and comfort as you step into a world of chic sophistication.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="shortcut icon"
        href="/favicon/favicon.ico"
        type="image/x-icon"
      />

      <body>{children}</body>
    </html>
  );
}
