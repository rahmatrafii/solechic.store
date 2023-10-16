import { allSize } from "@/public/constat";
import React, { SetStateAction } from "react";

const SelectSize = ({
  size,
  setSize,
  error,
}: {
  size: number;
  setSize: React.Dispatch<SetStateAction<number>>;
  error: string;
}) => {
  const handleSize = (number: number) => {
    setSize((prev: number) => (prev === number ? 0 : number));
  };
  return (
    <div className="grid grid-cols-3 gap-2 mb-10">
      {allSize.map((number: number) => (
        <div
          key={number}
          onClick={() => handleSize(number)}
          className={` ${
            number === size ? "bg-black text-white" : "text-black bg-white"
          } border-[2px] border-black py-3 flex-center rounded-xl cursor-pointer`}
        >
          <input
            type="radio"
            value={number}
            name="checkboxGroup"
            className="appearance-none "
          />
          {number}
        </div>
      ))}
      {error.length > 0 && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SelectSize;
