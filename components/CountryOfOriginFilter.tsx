import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import CustomDropDown from "./CustomDropDown";
import { BsTrashFill } from "react-icons/bs";
import { COOParam } from "@/public/constat";
import { FilterGroup, FilterItem } from "@/types";

type Props = {
  index: number;
  indexGroup: number;
  selected: string;
  value: string;
  operator: string;
  setFilterValue: Dispatch<SetStateAction<FilterGroup[]>>;
  handleRemoveFilter: MouseEventHandler<HTMLButtonElement>;
};

const CountryOfOriginFilter = ({
  handleRemoveFilter,
  operator,
  index,
  indexGroup,
  setFilterValue,
  selected,
  value,
}: Props) => {
  const handleSetSelected = (e: string, type: string) => {
    setFilterValue((prevFilterValue: FilterGroup[]) => {
      const updatedFilterValue = [...prevFilterValue];
      if (type == "operator") {
        updatedFilterValue[indexGroup][index].operator = e;
      } else if (type == "param") {
        updatedFilterValue[indexGroup][index].param = e;
      }
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
          <p className="font-medium"> Country of Origin : </p>
        </div>
        <CustomDropDown
          options={COOParam}
          selected={selected}
          setSelected={(e: string) => handleSetSelected(e, "param")}
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
