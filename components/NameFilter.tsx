import React, { Dispatch, SetStateAction } from "react";
import CustomDropDown from "./CustomDropDown";
import { nameParam } from "@/public/constat";
import { BsTrashFill } from "react-icons/bs";
import { FilterGroup, FilterItem } from "@/types";

type Props = {
  index: number;
  indexGroup: number;
  selected: string;
  value: string;
  setFilterValue: Dispatch<SetStateAction<FilterGroup[]>>;
};

const NameFilter = ({
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
      const updatedFilterValue = prevFilterValue.map((group: any, i: number) =>
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
      className={`flex w-full justify-between items-center mb-3 p-1 border rounded-md md:border-none`}
    >
      <div className="flex md:items-center items-start justify-start flex-col md:flex-row">
        <span className="md:mr-3 mb-3 md:mb-0 md:text-base text-xs">
          Name :{" "}
        </span>
        <CustomDropDown
          options={nameParam}
          selected={selected}
          setSelected={handleSetSelected}
        />
        <input
          onChange={(e) => handleChangeName(e.target.value)}
          placeholder="value"
          value={value}
          className="border py-1 px-2 rounded-md mr-3"
        />
      </div>

      <button className="text-red-600" onClick={handleRemoveFilter}>
        <BsTrashFill />
      </button>
    </div>
  );
};

export default NameFilter;
