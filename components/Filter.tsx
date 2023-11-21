"use client";
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import AddFilter from "./AddFilter";
import { FaPlus } from "react-icons/fa6";
import NameFilter from "./NameFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import CountryOfOriginFilter from "./CountryOfOriginFilter";
import DeleteGroup from "./DeleteGroup";
import { FilterGroup } from "@/types";
import { usePathname } from "next/navigation";
import {
  ganerateCountryOfOriginFilter,
  ganerateNameFilter,
  ganeratePriceFilter,
  ganerateRatingFilter,
} from "@/utils/filterAction";
import AddGroup from "./AddGroup";

const Filter = () => {
  const pathName = usePathname();
  const [filterActive, setFilterActive] = useState(false);
  const [filterValue, setfilterValue] = useState<FilterGroup[]>([[]]);

  const handleAddFilter = (
    operator: string = "",
    group: number,
    type: string,
    initial?: string
  ) => {
    if (type !== "price") {
      setfilterValue((prev) => {
        const updatedFilterValue = [...prev];
        updatedFilterValue[group] = [
          ...updatedFilterValue[group],
          {
            operator: operator,
            type: type,
            param: initial || "",
            value: "",
          },
        ];
        return updatedFilterValue;
      });
    } else if (type == "price") {
      setfilterValue((prev) => {
        const updatedFilterValue = [...prev];
        updatedFilterValue[group] = [
          ...updatedFilterValue[group],
          {
            operator: operator,
            type: "price",
            from: "",
            to: "",
          },
        ];
        return updatedFilterValue;
      });
    }
  };
  const handleAddGroup = (operator: string) => {
    if (
      (!filterValue[filterValue.length - 1][1] && filterValue.length > 1) ||
      filterValue[0].length == 0
    )
      return false;

    setfilterValue((prev) => [...prev, [{ operator: operator }]]);
  };

  const handleDeleteGroup = (indexToRemove: number) => {
    if (filterValue.length === 1) return false;
    if (indexToRemove == 0) return false;
    setfilterValue((prev) => prev.filter((item, i) => i !== indexToRemove));
  };

  const handleSave = async () => {
    setFilterActive(false);

    let length = 0;

    filterValue.map((group, i) => {
      if (i == 0 && group.length > 0) {
        return (length += 1);
      } else if (i >= 0 && group.length > 1) {
        return (length += 1);
      }
    });

    if (length == 1) {
      let string: string[] = [];

      filterValue.map((item, i) => {
        if (i == 0 && item[i]) {
          item[i].operator = "";
        }
        item.map((value) => {
          if (value.type == "name" && value.value) {
            const res = ganerateNameFilter(
              value as {
                type: string;
                param: string;
                value: string;
                operator: string;
              }
            );
            string.push(`${res}`);
          } else if (value.type == "price" && (value.from || value.to)) {
            const res = ganeratePriceFilter(
              value as {
                type: string;
                from: string;
                to: string;
                operator: string;
              }
            );

            string.push(`${res}`);
          } else if (value.type == "rating" && value.value) {
            const res = ganerateRatingFilter(
              value as {
                type: string;
                param: string;
                value: string;
                operator: string;
              }
            );

            string.push(`${res}`);
          } else if (value.type == "country of origin" && value.value) {
            const res = ganerateCountryOfOriginFilter(
              value as {
                type: string;
                param: string;
                value: string;
                operator: string;
              }
            );

            string.push(`${res}`);
          }
        });
      });

      if (pathName.split("/")[2] !== "all" && string.length > 0) {
        string.push(` && category match "${pathName.split("/")[2]}*"`);
      }

      const searchParams = new URLSearchParams(window.location.search);
      localStorage.setItem(
        `${pathName.split("/")[2]}-filter`,
        JSON.stringify(filterValue)
      );

      searchParams.set("filters", string.join(" "));
      searchParams.delete("type");

      const newPathName = `${
        window.location.pathname
      }?${searchParams.toString()}`;

      window.location.href = newPathName;
      return false;
    } else if (length > 1) {
      let group: any[] = [];
      filterValue.map((item, i) => {
        let string = "";
        if (!item[0]) return false;
        if (i == 0 && item[i]) {
          item[i].operator = "";
        }
        item.map((value: any, i2) => {
          if (value.type == "name" && value.value) {
            const res = ganerateNameFilter(
              value as {
                type: string;
                param: string;
                value: string;
                operator: string;
              }
            );

            string += `${res}`;
          } else if (value.type == "price" && (value.from || value.to)) {
            const res = ganeratePriceFilter(
              value as {
                type: string;
                from: string;
                to: string;
                operator: string;
              }
            );

            string += `${res}`;
          } else if (value.type == "rating" && value.value) {
            const res = ganerateRatingFilter(
              value as {
                type: string;
                param: string;
                value: string;
                operator: string;
              }
            );

            string += `${res}`;
          } else if (value.type == "country of origin" && value.value) {
            const res = ganerateCountryOfOriginFilter(
              value as {
                type: string;
                param: string;
                value: string;
                operator: string;
              }
            );

            string += `${res}`;
          }
        });

        // ? jika ada stringnya phus ke group
        if (string) {
          group.push(
            ` ${
              item[0].operator ? item[0].operator : ""
            } (_type == "product" && ${
              pathName.split("/")[2] !== "all"
                ? `category match "${pathName.split("/")[2]}*" &&`
                : ""
            } ${string})`
          );
        }
      });

      const searchParams = new URLSearchParams(window.location.search);

      searchParams.set("type", "grouping");

      searchParams.set("filters", group.join(""));
      const newPathName = `${
        window.location.pathname
      }?${searchParams.toString()}`;

      localStorage.setItem(
        `${pathName.split("/")[2]}-filter`,
        JSON.stringify(filterValue)
      );

      window.location.href = newPathName;
      return false;
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      localStorage.removeItem(`${pathName.split("/")[2]}-filter`);
      searchParams.delete("filters");
      searchParams.delete("type");
      const newPathName = `${
        window.location.pathname
      }?${searchParams.toString()}`;
      window.location.href = newPathName;
    }
  };

  useEffect(() => {
    const fil = localStorage.getItem(`${pathName.split("/")[2]}-filter`);
    const ter = JSON.parse(fil as string);

    if (ter) {
      setfilterValue(ter);
    }
  }, []);

  return (
    <div className="relative">
      <button
        className="flex gap-x-2 justify-center items-center py-2 px-4"
        onClick={() => setFilterActive((prev) => !prev)}
      >
        Filter {filterActive ? <LiaTimesSolid /> : <IoFilter />}
      </button>
      <div
        className={`${
          filterActive
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        } transition-all duration-300 absolute right-0  border md:min-w-[450px] sm:w-max shadow-md rounded-lg bg-white p-2 sm:p-3 md:p-5`}
      >
        <div className="my-8 w-full">
          {filterValue.map((item, i) => {
            const fristFilter =
              i == 0 && !item[0] ? true : i > 0 && !item[1] ? true : false;
            return (
              <>
                <p className="font-semibold text-center mx-auto w-max mb-3">
                  {item[0]?.operator == " && " && i > 0
                    ? "AND"
                    : item[0]?.operator == " || " && i > 0
                    ? "OR"
                    : null}
                </p>
                <div
                  className={`w-full flex  border border-gray-400 rounded-xl p-2 sm:p-3 md:p-4 mb-3  ${
                    item.length > 0 ? "justify-between" : "justify-center"
                  }`}
                  key={i}
                >
                  <div className="w-auto mr-2 sm:mr-4 md:mr-5">
                    {item.map((item2, i2) =>
                      item2.type == "name" ? (
                        <NameFilter
                          groupOprator={item[0]?.operator as string}
                          operator={item2.operator as string}
                          key={i2 + i}
                          index={i2}
                          indexGroup={i}
                          selected={item2.param as string}
                          value={item2.value as string}
                          setFilterValue={setfilterValue}
                        />
                      ) : item2.type == "price" ? (
                        <PriceFilter
                          groupOprator={item[0]?.operator as string}
                          operator={item2.operator as string}
                          index={i2}
                          indexGroup={i}
                          key={i2 + i}
                          setFilterValue={setfilterValue}
                          from={filterValue[i][i2].from as string}
                          to={filterValue[i][i2].to as string}
                        />
                      ) : item2.type == "rating" ? (
                        <RatingFilter
                          groupOprator={item[0]?.operator as string}
                          operator={item2.operator as string}
                          index={i2}
                          indexGroup={i}
                          key={i2 + i}
                          setFilterValue={setfilterValue}
                          ratingSelected={filterValue[i][i2].value as string}
                          paramSelected={filterValue[i][i2].param as string}
                        />
                      ) : item2.type == "country of origin" ? (
                        <CountryOfOriginFilter
                          groupOprator={item[0]?.operator as string}
                          operator={item2.operator as string}
                          key={i2 + i}
                          index={i2}
                          indexGroup={i}
                          selected={item2.param as string}
                          value={item2.value as string}
                          setFilterValue={setfilterValue}
                        />
                      ) : null
                    )}
                  </div>
                  <div
                    className={`w-max flex flex-col md:flex-row items-end justify-end ${
                      item.length > 0 && "flex col"
                    }`}
                  >
                    <AddFilter
                      fristFilter={fristFilter}
                      index={i}
                      handleAddFilter={handleAddFilter}
                    />
                    {i > 0 ? (
                      <DeleteGroup
                        handleDeleteGroup={() => handleDeleteGroup(i)}
                      />
                    ) : null}
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="flex justify-end items-center ">
          <AddGroup handleAddGroup={handleAddGroup} />
          <button
            className="md:py-2 md:px-4 py-1 px-2 text-xs rounded-md bg-black text-white "
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;

[
  [
    {
      operator: " || ",
      type: "rating",
      param: "higher",
      value: "5",
    },
    { operator: " && ", type: "price", from: "", to: "170" },
  ],
  [
    { operator: " && " },
    {
      operator: " && ",
      type: "country of origin",
      param: "comes from",
      value: "",
    },
    {
      operator: " || ",
      type: "rating",
      param: "higher",
      value: "",
    },
  ],
];
