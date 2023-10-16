import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import type { Metadata } from "next";
import Provider from "@/context/client-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: {
    default: "SoleChic.store",
    template: " %s | SoleChic.store",
  },
  description:
    "SoleChic.store, where every step is a statement. Elevate your style with our curated collection of trendy and elegant footwear. Discover the perfect blend of fashion and comfort as you step into a world of chic sophistication.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <link
        rel="shortcut icon"
        href="/favicon/favicon.ico"
        type="image/x-icon"
      />
      <body>
        <Provider session={session}>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
