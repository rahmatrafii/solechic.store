"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  index: number;
  handleAddFilter: (group: number, type: string, initial?: string) => void;
};

const AddFilter = ({ index, handleAddFilter }: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative h-full hover:bg-gray-200 transition-all flex items-center rounded-md">
      <button
        className="text-xl h-full p-1 md:p-2 "
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <FaPlus />
      </button>
      <div
        className={`${
          showOptions
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        } transition-all duration-300 absolute right-[40px]  w-[150px] md:w-max h-fit rounded-lg overflow-hidden border`}
      >
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            setShowOptions(false);
            handleAddFilter(index, "name", "contains");
          }}
        >
          Name
        </button>
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            setShowOptions(false);
            handleAddFilter(index, "price");
          }}
        >
          Price
        </button>
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            setShowOptions(false);
            handleAddFilter(index, "rating", "higher");
          }}
        >
          Rating
        </button>
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            setShowOptions(false);
            handleAddFilter(index, "country of origin", "comes from");
          }}
        >
          Country of Origin
        </button>
      </div>
    </div>
  );
};

export default AddFilter;
