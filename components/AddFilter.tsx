"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";

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

const ButtonAddFilter = ({
  handleAdd,
  name,
}: {
  handleAdd: any;
  name: string;
}) => {
  return (
    <button
      className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
      onClick={handleAdd}
    >
      {name}
    </button>
  );
};

const AddFilter = ({ index, handleAddFilter, fristFilter }: Props) => {
  const [operator, setOperator] = useState("");
  const [showOperator, setshowOperator] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleAdd = ({
    index,
    operator,
    parameter,
    type,
  }: {
    operator?: string;
    index?: number;
    type?: string;
    parameter?: string;
  }) => {
    setShowOptions(false);
    setshowOperator(false);
    handleAddFilter(
      operator as string,
      index as number,
      type as string,
      parameter as string
    );
  };

  const handleOperator = (operator: string) => {
    setShowOptions(true);
    setOperator(operator);
  };

  return (
    <div className="relative h-full hover:bg-gray-200 transition-all flex items-center rounded-md">
      {showOperator == false && showOptions == false ? (
        <button
          className="text-xl h-full p-1 md:p-2 "
          onClick={() => {
            if (fristFilter) {
              setShowOptions(true);
            } else {
              setshowOperator(true);
            }
          }}
        >
          <FaPlus />
        </button>
      ) : (
        <button
          className="text-xl h-full p-1 md:p-2 "
          onClick={() => {
            setShowOptions(false);
            setshowOperator(false);
          }}
        >
          <VscClose />
        </button>
      )}
      <div
        className={`${
          showOperator
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        } transition-all duration-300 absolute right-[40px]  w-[150px] md:w-max h-fit rounded-lg overflow-hidden border`}
      >
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => handleOperator("AND")}
        >
          AND
        </button>
        <button
          className="w-full py-2 whitespace-nowrap hover:bg-slate-200 bg-white text-xs md:text-sm"
          onClick={() => handleOperator("OR")}
        >
          OR
        </button>
      </div>
      <div
        className={`${
          showOptions
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        } transition-all duration-300 absolute right-[40px]  w-[150px] md:w-max h-fit rounded-lg overflow-hidden border z-[11]`}
      >
        <ButtonAddFilter
          handleAdd={() =>
            handleAdd({
              operator,
              index,
              type: "name",
              parameter: "contains",
            })
          }
          name="Name"
        />
        <ButtonAddFilter
          handleAdd={() =>
            handleAdd({
              operator,
              index,
              type: "price",
            })
          }
          name="Price"
        />

        <ButtonAddFilter
          handleAdd={() =>
            handleAdd({
              operator,
              index,
              type: "rating",
              parameter: "higher",
            })
          }
          name="Rating"
        />

        <ButtonAddFilter
          handleAdd={() =>
            handleAdd({
              operator,
              index,
              type: "country of origin",
              parameter: "comes from",
            })
          }
          name="Country of Origin"
        />
      </div>
    </div>
  );
};

export default AddFilter;
