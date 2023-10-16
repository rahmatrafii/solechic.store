"use client";
import Image from "next/image";
import { banner } from "@/public/constat";
const Banner = () => {
  return (
    <div className="max-w-full  mb-12 ">
      <div className="w-full flex justify-center">
        <Image
          src={`/static/image/${banner[0]}`}
          alt={banner[0]}
          className={`banner-style hidden lg:block`}
          width={200}
          height={200}
        />
        <Image
          src={`/static/image/${banner[1]}`}
          alt={banner[1]}
          className={`banner-style hidden sm:block`}
          width={200}
          height={200}
        />
        <Image
          src={`/static/image/${banner[2]}`}
          alt={banner[2]}
          className={`banner-style`}
          width={200}
          height={200}
        />
        <Image
          src={`/static/image/${banner[3]}`}
          alt={banner[3]}
          className={`banner-style`}
          width={200}
          height={200}
        />
        <Image
          src={`/static/image/${banner[4]}`}
          alt={banner[4]}
          className={`banner-style hidden md:block`}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default Banner;
