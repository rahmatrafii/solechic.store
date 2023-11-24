import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import CustomDropDown from "./CustomDropDown";
import { BsTrashFill } from "react-icons/bs";
import { ratingParam, ratingValue } from "@/public/constat";
import { FilterGroup, FilterItem } from "@/types";

type Props = {
  operator: string;
  index: number;
  indexGroup: number;
  setFilterValue: Dispatch<SetStateAction<FilterGroup[]>>;
  paramSelected: string;
  ratingSelected: string;
  handleRemoveFilter: MouseEventHandler<HTMLButtonElement>;
};

const RatingFilter = ({
  handleRemoveFilter,
  operator,
  index,
  indexGroup,
  ratingSelected,
  setFilterValue,
  paramSelected,
}: Props) => {
  const handleSetSelected = (e?: string, type?: string) => {
    setFilterValue((prevFilterValue: FilterGroup[]) => {
      const updatedFilterValue = [...prevFilterValue];
      if (type == "operator") {
        updatedFilterValue[indexGroup][index].operator = e;
      } else if (type == "param") {
        updatedFilterValue[indexGroup][index].param = e;
      } else if (type == "rating") {
        updatedFilterValue[indexGroup][index].value = e;
      }
      return updatedFilterValue;
    });
  };

  const handleChangeRating = (value: string) => {
    setFilterValue((prevFilterValue: FilterGroup[]) => {
      const updatedFilterValue = [...prevFilterValue];
      updatedFilterValue[indexGroup][index].value = value;
      return updatedFilterValue;
    });
  };

  return (
    <div
      className={`flex w-full justify-between items-center mb-3 p-1 border rounded-md md:border-none `}
    >
      <div className="flex flex-col md:flex-row justify-start items-start  md:items-center">
        <div className="md:mr-3 mb-3 md:mb-0 md:text-base text-xs flex items-center">
          <p className="mr-3 text-slate-500">
            {(operator !== "" && index > 0 && indexGroup === 0) ||
            (operator !== "" && index > 1 && indexGroup !== 0) ? (
              <CustomDropDown
                options={["AND", "OR"]}
                selected={operator}
                setSelected={(e: string) => handleSetSelected(e, "operator")}
              />
            ) : null}
          </p>
          <p className="font-medium"> Rating : </p>
        </div>
        <CustomDropDown
          options={ratingParam}
          selected={paramSelected}
          setSelected={(e: string) => handleSetSelected(e, "param")}
        />
        <input
          type="number"
          onChange={(e) => handleChangeRating(e.target.value)}
          placeholder="value"
          value={ratingSelected}
          className="border py-1 px-2 rounded-md mr-3"
        />
      </div>
      <button className="text-red-600" onClick={handleRemoveFilter}>
        <BsTrashFill />
      </button>
    </div>
  );
};

export default RatingFilter;
