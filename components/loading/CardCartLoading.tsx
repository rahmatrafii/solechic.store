import React from "react";

const CardCartLoading = () => {
  return (
    <div className="card flex justify-start w-full border-t-[2px] py-5 min-[200px]">
      <div className=" mr-3 sm:mr-6 bg-slate-300 min-w-[90px] min-h-[90px] sm:w-[200px] sm:h-[200px]"></div>
      <div className="">
        <p className="mb-0.5 w-[200px] h-[20px] bg-slate-300"></p>
        <h4 className=" mb-0.5  w-[200px] h-[20px] bg-slate-300"></h4>
        <p className="mb-1   w-[200px] h-[20px] bg-slate-300"></p>
        <div className="flex gap-4 mb-7">
          <div className=" w-[60px] h-[20px] bg-slate-300"></div>
          <div className=" w-[60px] h-[20px] bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
};

export default CardCartLoading;
