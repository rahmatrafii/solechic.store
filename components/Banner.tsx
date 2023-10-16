"use client";
import { BannerType } from "@/types";
import { urlFor } from "@/sanity/sanity-utils";
const Banner = ({ banners }: { banners: BannerType[] }) => {
  return (
    <div className="max-w-full  mb-12 ">
      <div className="w-full flex justify-center">
        <img
          src={urlFor(banners[4]?.image) || ""}
          alt={"banner 1"}
          className={`banner-style hidden lg:block`}
          width={200}
          height={200}
        />
        <img
          src={urlFor(banners[3]?.image) || ""}
          alt={"banner 2"}
          className={`banner-style hidden sm:block`}
          width={200}
          height={200}
        />
        <img
          src={urlFor(banners[2]?.image) || ""}
          alt={"banner 3"}
          className={`banner-style`}
          width={200}
          height={200}
        />
        <img
          src={urlFor(banners[1]?.image) || ""}
          alt={"banner 4"}
          className={`banner-style`}
          width={200}
          height={200}
        />
        <img
          src={urlFor(banners[0]?.image) || ""}
          alt={"banner 5"}
          className={`banner-style hidden md:block`}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default Banner;
