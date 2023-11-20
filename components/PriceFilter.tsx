"use client";
import { FilterGroup, FilterItem } from "@/types";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { BsTrashFill } from "react-icons/bs";

type Props = {
  groupOprator: string;

  operator: string;
  index: number;
  indexGroup: number;
  setFilterValue: Dispatch<SetStateAction<FilterGroup[]>>;
  from: string;
  to: string;
};

const PriceFilter = ({
  groupOprator,
  operator,
  setFilterValue,
  from,
  to,
  index,
  indexGroup,
}: Props) => {
  const handleChange = (type: string, value: string) => {
    setFilterValue((preFilterValue: FilterGroup[]) => {
      const updateFilterValue = [...preFilterValue];
      if (type == "from") {
        updateFilterValue[indexGroup][index].from = value;
      } else if (type == "to") {
        updateFilterValue[indexGroup][index].to = value;
      }
      return updateFilterValue;
    });
  };

  const handleDeleteFilter = () => {
    setFilterValue((prevFilterValue: FilterGroup[]) => {
      const updatedFilterValue = prevFilterValue.map(
        (group: FilterGroup, i: number) =>
          i === indexGroup
            ? group.filter((item: FilterItem, j: number) => j !== index)
            : group
      );
      return updatedFilterValue;
    });
  };
  return (
    <div
      className={`flex w-full justify-between items-center mb-3 p-1 border rounded-md md:border-none`}
    >
      <div className="flex flex-col md:flex-row items-start justify-start md:items-center">
        <div className="md:mr-3 mb-3 md:mb-0 md:text-base text-xs flex items-center">
          <p className="mr-3 text-slate-500">
            {indexGroup > 0
              ? operator == " && " && index > 1
                ? "AND"
                : operator == " || " && index > 1
                ? "OR"
                : null
              : operator == " && " && index > 0
              ? "AND"
              : operator == " || " && index > 0
              ? "OR"
              : null}
          </p>
          <p className="font-medium"> Price : </p>
        </div>
        <div className="md:mr-3 mb-3 md:mb-0">
          <label className="mr-2" htmlFor="from">
            from
          </label>
          <input
            value={from}
            type="number"
            id="from"
            name="from"
            className="border py-1 px-2 rounded-md mr-2 w-[150px]"
            placeholder="value"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("from", e.target.value)
            }
          />
        </div>
        <div className="md:mr-3 mb-3 md:mb-0">
          <label className="mr-2" htmlFor="to">
            to
          </label>
          <input
            type="number"
            id="to"
            name="to"
            className="border py-1 px-2 rounded-md mr-2 w-[150px]"
            placeholder="value"
            value={to}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("to", e.target.value)
            }
          />
        </div>
      </div>
      <button className="text-red-600" onClick={handleDeleteFilter}>
        <BsTrashFill />
      </button>
    </div>
  );
};

export default PriceFilter;
