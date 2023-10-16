"use client";
import { urlFor } from "@/sanity/sanity-utils";
import { ImageType } from "@/types";
import React, { useState } from "react";

const DetailProductImage = ({ images }: { images: ImageType[] }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="lg:flex flex-row-reverse">
      <div className="w-full mb-5 overflow-hidden">
        <img
          src={urlFor(images && images[index])}
          alt="Image"
          className="w-full  object-contain"
        />
      </div>
      <div>
        <div className="flex w-full overflow-x-auto gap-4 lg:flex-col lg mr-5 p-2 lg:p-0 custom-scrollbar">
          {images?.map((image: ImageType, i: number) => (
            <img
              key={image._key}
              src={urlFor(image)}
              onMouseEnter={() => setIndex(i)}
              alt="Image"
              className={` ${
                i === index ? "opacity-30" : "opacity-100"
              } w-[80px] h-[80px] rounded-md object-cover transition-opacity duration-200 cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProductImage;
