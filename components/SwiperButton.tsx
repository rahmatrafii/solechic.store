import { useSwiper } from "swiper/react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

export const SwiperButton = () => {
  const swiper = useSwiper();

  const handleClick = (type: "next" | "prev") => {
    if (type == "next") {
      swiper.slideNext();
    } else {
      swiper.slidePrev();
    }
  };
  return (
    <>
      <button
        className="absolute w-[50px] h-[50px] text-2xl top-1/2 -translate-y-1/2  shadow-xl border border-blue-500 flex-center right-0  z-10 bg-white rounded-full "
        onClick={() => handleClick("next")}
      >
        <BsArrowRight />
      </button>
      <button
        className="absolute w-[50px] h-[50px] text-2xl top-1/2 -translate-y-1/2 shadow-xl border border-blue-500 flex-center left-0 z-10 bg-white rounded-full "
        onClick={() => handleClick("prev")}
      >
        <BsArrowLeft />
      </button>
    </>
  );
};
