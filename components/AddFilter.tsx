"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  index: number;
  fristFilter: boolean;
  handleAddFilter: (
    operator: string,
    group: number,
    type: string,
    initial?: string
  ) => void;
};

const AddFilter = ({ index, handleAddFilter, fristFilter }: Props) => {
  const [operator, setOperator] = useState("");
  const [showOperator, setshowOperator] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative h-full hover:bg-gray-200 transition-all flex items-center rounded-md">
      <button
        className="text-xl h-full p-1 md:p-2 "
        onClick={() => {
          if (fristFilter) {
            setShowOptions((prev) => !prev);
          } else {
            setshowOperator((prev) => !prev);
          }
        }}
      >
        <FaPlus />
      </button>
      <div
        className={`${
          showOperator
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        } transition-all duration-300 absolute right-[40px]  w-[150px] md:w-max h-fit rounded-lg overflow-hidden border`}
      >
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            setShowOptions((prev) => !prev);
            setshowOperator((prev) => !prev);
            setOperator(" && ");
          }}
        >
          AND
        </button>
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            setShowOptions((prev) => !prev);
            setshowOperator((prev) => !prev);
            setOperator(" || ");
          }}
        >
          OR
        </button>
      </div>
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
            setshowOperator(false);
            handleAddFilter(operator, index, "name", "contains");
          }}
        >
          Name
        </button>
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            setShowOptions(false);
            handleAddFilter(operator, index, "price");
            setshowOperator(false);
          }}
        >
          Price
        </button>
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            setShowOptions(false);
            handleAddFilter(operator, index, "rating", "higher");
            setshowOperator(false);
          }}
        >
          Rating
        </button>
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            setShowOptions(false);
            handleAddFilter(operator, index, "country of origin", "comes from");
            setshowOperator(false);
          }}
        >
          Country of Origin
        </button>
      </div>
    </div>
  );
};

export default AddFilter;
