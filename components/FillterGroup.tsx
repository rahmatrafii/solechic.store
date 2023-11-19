"use client";
import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import AddFilter from "./AddFilter";
import CustomDropDown from "./CustomDropDown";
import { nameParam } from "@/public/constat";
import { BsTrashFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

type Props = {};
type nameType = {
  param: string;
  value: string;
};

const FillterGroup = (props: Props) => {
  const [name, setName] = useState<nameType[]>([]);

  const handleAddFilter = (type: string) => {
    if (type == "name") {
      const newArray = {
        param: "contains",
        value: "",
      };

      setName((prev) => [...prev, newArray]);
    }
  };

  const handleRemoveFilter = (type: string, indexToRemove: number) => {
    if (type === "name") {
      const newArray = name.filter((item, index) => index !== indexToRemove);
      setName(newArray);
    }
  };

  const setNameValue = (index: number, type: string, value: string) => {
    const newArray = [...name];
    if (type === "param") {
      newArray[index] = {
        ...newArray[index],
        param: value,
      };
      setName(newArray);
    } else if (type === "value") {
      newArray[index] = {
        ...newArray[index],
        value: value,
      };
      setName(newArray);
    }
  };

  
  return (
    <div className="w-full flex justify-center border rounded-xl p-4">
      <div className="w-auto mr-5">
        <div id="name">
          {name?.map((item, i) => {
            return (
              <div
                className={`flex w-full justify-between items-center mb-3 `}
                key={i}
              >
                <span className="mr-2">Name</span>
                <CustomDropDown
                  index={i}
                  options={nameParam}
                  selected={item.param}
                  setSelected={setNameValue}
                />
                <input
                  onChange={(e) => setNameValue(i, "value", e.target.value)}
                  placeholder="value"
                  value={name[i].value}
                  className="border py-1 px-2 rounded-md mr-2"
                />

                <button
                  className="text-red-600"
                  onClick={() => handleRemoveFilter("name", i)}
                >
                  <BsTrashFill />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-max flex items-end justify-end">
        <AddFilter handleAddFilter={handleAddFilter} />
      </div>
    </div>
  );
};

export default FillterGroup;
