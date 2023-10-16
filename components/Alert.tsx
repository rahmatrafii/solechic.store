import React from "react";

const Alert = ({
  type,
  message,
  isShow,
}: {
  type: string;
  message?: string;
  isShow: boolean;
}) => {
  return (
    <p
      className={`fixed ${
        isShow ? "-translate-y-0" : "translate-y-[200px]"
      } py-2 px-3 bottom-10 left-1/2 transition-all duration-500 -translate-x-1/2  rounded-sm ${
        type === "error"
          ? "bg-red-400 text-white"
          : type === "success"
          ? "bg-green-400 text-white"
          : "bg-white shadow-lg text-green-500"
      } z-20 whitespace-nowrap text-xs md:text-base`}
    >
      {message}
    </p>
  );
};

export default Alert;
