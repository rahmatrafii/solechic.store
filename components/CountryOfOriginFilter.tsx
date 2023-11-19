import React, { Dispatch, SetStateAction } from "react";
import CustomDropDown from "./CustomDropDown";
import { BsTrashFill } from "react-icons/bs";
import { COOParam } from "@/public/constat";
import { FilterGroup, FilterItem } from "@/types";

type Props = {
  index: number;
  indexGroup: number;
  selected: string;
  value: string;
  setFilterValue: Dispatch<SetStateAction<FilterGroup[]>>;
};

const CountryOfOriginFilter = ({
  index,
  indexGroup,
  setFilterValue,
  selected,
  value,
}: Props) => {
  const handleSetSelected = (e: string) => {
    setFilterValue((prevFilterValue: FilterGroup[]) => {
      const updatedFilterValue = [...prevFilterValue];
      updatedFilterValue[indexGroup][index].param = e;
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

  const handleChangeName = (value: string) => {
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
      <div className="flex md:items-center items-start justify-start flex-col md:flex-row">
        <span className="md:mr-3 mb-3 md:mb-0 md:text-base text-xs">
          Country of Origin :{" "}
        </span>
        <CustomDropDown
          options={COOParam}
          selected={selected}
          setSelected={handleSetSelected}
        />
        <input
          onChange={(e) => handleChangeName(e.target.value)}
          type="text"
          placeholder="value"
          className="border py-1 px-2 rounded-md mr-3"
          value={value}
        />
      </div>
      <button className="text-red-600" onClick={handleRemoveFilter}>
        <BsTrashFill />
      </button>
    </div>
  );
};

export default CountryOfOriginFilter;
