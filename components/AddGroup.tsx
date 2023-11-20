import React, { MouseEventHandler, useState } from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  handleAddGroup: (operator: string) => void;
};

const AddGroup = ({ handleAddGroup }: Props) => {
  const [showOperator, setShowOperator] = useState(false);
  return (
    <div
      className="md:py-2 md:px-4 py-1 px-2 text-xs rounded-md bg-black text-white whitespace-nowrap flex items-center justify-center mr-5 relative cursor-pointer"
      onClick={() => setShowOperator((prev) => !prev)}
    >
      <span className="mr-3">Add Filter Group</span>
      <FaPlus />
      <div
        className={`${
          showOperator
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        } transition-all duration-300 absolute right-[0] top-[100%] min-w-[150px] rounded-lg  border flex flex-col`}
      >
        <button
          className="w-full py-2 font-semibold text-black whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            handleAddGroup(" || ");
          }}
        >
          OR
        </button>
        <button
          className="w-full py-2 font-semibold text-black whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => {
            handleAddGroup(" && ");
          }}
        >
          AND
        </button>
      </div>
    </div>
  );
};

export default AddGroup;
