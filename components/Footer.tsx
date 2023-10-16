import React from "react";
import { footer } from "@/public/constat";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="px-10 pt-10 pb-3 bg-black text-white">
      <div className="md:flex justify-between mb-10">
        <div className="mb-[25px] max-w-[350px]">
          <h2 className="text-3xl mb-3">{footer.title}</h2>
          <p className="text-sm">{footer.desc}</p>
        </div>
        <div className="mb-[25px]">
          <h4 className="mb-2 text-base">GET HELP</h4>
          {footer.getHelp.map((item: string) => (
            <p className="text-sm mb-[2px]">{item}</p>
          ))}
        </div>
        <div className="mb-[25px]">
          <h4 className="mb-2 text-base">ABOUT</h4>
          {footer.about.map((item: string) => (
            <p className="text-sm mb-[2px]">{item}</p>
          ))}
        </div>
        <div className="flex gap-5 md:flex-col">
          {footer.sosmed.map((item) => (
            <Link
              href={"/"}
              key={item.title}
              className="w-[40px] h-[40px] flex-center bg-white text-black rounded-full hover:text-white hover:bg-black transition duration-300 text-lg"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full text-center">{footer.other[1]}</div>
    </footer>
  );
};

export default Footer;
