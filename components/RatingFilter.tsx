import React, { Dispatch, SetStateAction } from "react";
import CustomDropDown from "./CustomDropDown";
import { BsTrashFill } from "react-icons/bs";
import { ratingParam, ratingValue } from "@/public/constat";
import { FilterGroup, FilterItem } from "@/types";

type Props = {
  index: number;
  indexGroup: number;
  setFilterValue: Dispatch<SetStateAction<FilterGroup[]>>;
  paramSelected: string;
  ratingSelected: string;
};

const RatingFilter = ({
  index,
  indexGroup,
  ratingSelected,
  setFilterValue,
  paramSelected,
}: Props) => {
  const handleSetSelected = (type?: string, e?: string) => {
    setFilterValue((prevFilterValue: FilterGroup[]) => {
      const updatedFilterValue = [...prevFilterValue];
      if (type == "param") {
        updatedFilterValue[indexGroup][index].param = e;
      } else if (type == "rating") {
        updatedFilterValue[indexGroup][index].value = e;
      }
      return updatedFilterValue;
    });
  };

  const handleRemoveFilter = () => {
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
      className={`flex w-full justify-between items-center mb-3 p-1 border rounded-md md:border-none `}
    >
      <div className="flex flex-col md:flex-row justify-start items-start  md:items-center">
        <span className="md:mr-3 mb-3 md:mb-0 md:text-base text-xs">
          Rating :{" "}
        </span>
        <CustomDropDown
          options={ratingParam}
          selected={paramSelected}
          setSelected={(e: string) => handleSetSelected("param", e)}
        />
        <CustomDropDown
          options={ratingValue}
          selected={ratingSelected}
          setSelected={(e: string) => handleSetSelected("rating", e)}
        />
      </div>
      <button className="text-red-600" onClick={handleRemoveFilter}>
        <BsTrashFill />
      </button>
    </div>
  );
};

export default RatingFilter;
