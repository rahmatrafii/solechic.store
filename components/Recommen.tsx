"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ProductType } from "@/types";
import CardProduct from "./CardProduct";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { SwiperButton } from "./SwiperButton";

const Recommen = ({ products }: { products: any }) => {
  return (
    <div>
      <h3 className="mb-5 md font-semibold text-2xl ">Recomedations</h3>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        modules={[Pagination, Navigation, A11y]}
        className="relative"
        draggable={false}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1100: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperButton />
        <div>
          {products.slice(0, 10).map((product: ProductType) => (
            <SwiperSlide key={product._id}>
              <CardProduct product={product} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Recommen;
