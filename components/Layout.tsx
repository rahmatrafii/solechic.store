"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  return (
    <>
      {!pathName.includes("/success") && <Navbar />}
      <main className="w-full px-10">{children}</main>
      {!pathName.includes("/success") && <Footer />}
    </>
  );
};

export default Layout;
