"use client";
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import AddFilter from "./AddFilter";
import NameFilter from "./NameFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import CountryOfOriginFilter from "./CountryOfOriginFilter";
import DeleteGroup from "./DeleteGroup";
import { FilterGroup, FilterItem } from "@/types";
import { usePathname } from "next/navigation";
import {
  ganerateCountryOfOriginFilter,
  ganerateNameFilter,
  ganeratePriceFilter,
  ganerateRatingFilter,
} from "@/utils/filterAction";
import AddGroup from "./AddGroup";
import CustomDropDown from "./CustomDropDown";

const Filter = () => {
  const pathName = usePathname();
  const [filterActive, setFilterActive] = useState(false);
  const [filterValue, setFilterValue] = useState<FilterGroup[]>([[]]);

  const handleAddFilter = (
    operator: string = "",
    group: number,
    type: string,
    initial?: string
  ) => {
    if (type !== "price") {
      setFilterValue((prev) => {
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
      setFilterValue((prev) => {
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

  const handleRemoveFilter = (indexGroup: number, index: number) => {
    setFilterValue((prevFilterValue: FilterGroup[]) => {
      const updatedFilterValue = prevFilterValue.map((group: any, i: number) =>
        i === indexGroup
          ? group.filter((item: FilterItem, j: number) => j !== index)
          : group
      );
      return updatedFilterValue;
    });
  };

  const handleAddGroup = (operator: string) => {
    if (
      !filterValue[filterValue.length - 1][1] &&
      filterValue.length > 1 &&
      filterValue[0].length == 0
    )
      return false;

    setFilterValue((prev) => [...prev, [{ operator: operator }]]);
  };

  const handleDeleteGroup = (indexToRemove: number) => {
    if (filterValue.length === 1) return false;
    if (indexToRemove == 0) return false;
    setFilterValue((prev) => prev.filter((item, i) => i !== indexToRemove));
  };

  const handleChangeOperatorGroup = (indexGroup: number, operator: string) => {
    setFilterValue((prevFilterValue: FilterGroup[]) => {
      const updatedFilterValue = [...prevFilterValue];
      updatedFilterValue[indexGroup][0].operator = operator;
      return updatedFilterValue;
    });
  };

  const handleSave = async () => {
    setFilterActive(false);
    const searchParams = new URLSearchParams(window.location.search);
    let length = 0;

    // ? mencek ada berapa filter yang disi
    filterValue.map((group, i) => {
      if (i == 0 && group.length > 0) {
        return (length += 1);
      } else if (i >= 0 && group.length > 1) {
        return (length += 1);
      }
    });

    // ? jika hanya ada 1 filter
    if (length == 1) {
      let string: string[] = [];

      filterValue.map((item, i) => {
        // ? menghapus semua operator group
        if (item[i]) {
          item[i].operator = "";
        }
        // ? rangkai filter didalam state menjadi query dan disimpan di let string
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

      // ? jika berada dipage selain All Products
      if (pathName.split("/")[2] !== "all" && string.length > 0) {
        string.push(` && category match "${pathName.split("/")[2]}*"`);
      }

      // ? set LocalStorage agar filter yang diisi user tidak hilang
      localStorage.setItem(
        `${pathName.split("/")[2]}-filter`,
        JSON.stringify(filterValue)
      );

      // ? query yang sudah dibuat dan dimasukkan di array disimpan di param "filters"
      searchParams.set("filters", string.join(" "));
      // ? hapus SearchParams "type" jika ada
      searchParams.delete("type");

      // ? rangkai url kedalam variable newPathName
      const newPathName = `${
        window.location.pathname
      }?${searchParams.toString()}`;

      // ? lalu ubah url dengan url yang sudah dirangkai
      window.location.href = newPathName;
      return false;
    } else if (length > 1) {
      let group: any[] = [];
      filterValue.map((item: FilterGroup, i) => {
        let string = "";

        // ? jika tidak ada filter di dalam item idex ke-1 berarti group kosong maka return false
        if (!item[1] && i !== 0) {
          return false;
        }

        item.map((value: any, i2: number) => {
          if (!value.type) {
            return false;
          }
          // ? menghapus operator difilter pertama didalam group
          if (i2 === 1 && i !== 0) {
            value.operator = "";
          } else if (i2 == 0 && i === 0) {
            value.operator = "";
          }

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
              group.length > 0
                ? item[0].operator == "AND"
                  ? "&&"
                  : item[0].operator == "OR"
                  ? "||"
                  : ""
                : ""
            } (_type == "product" && ${
              pathName.split("/")[2] !== "all"
                ? `category match "${pathName.split("/")[2]}*" &&`
                : ""
            } ${string})`
          );
        }
      });

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
      // ? jika filter kosong set dilocaleStorage menjadi kosong dan hapus semua seachparams
      localStorage.removeItem(`${pathName.split("/")[2]}-filter`);
      searchParams.delete("filters");
      searchParams.delete("type");
      const newPathName = `${
        window.location.pathname
      }?${searchParams.toString()}`;
      window.location.href = newPathName;
    }
  };

  // ? menyimpan filter di LocalStorage ke satate filterValue
  useEffect(() => {
    const fil = localStorage.getItem(`${pathName.split("/")[2]}-filter`);
    const ter = JSON.parse(fil as string);
    if (ter) {
      setFilterValue(ter);
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
                <div className="font-semibold text-center mx-auto w-max mb-3">
                  {i > 0 ? (
                    <CustomDropDown
                      options={["AND", "OR"]}
                      selected={item[0]?.operator}
                      setSelected={(e: string) =>
                        handleChangeOperatorGroup(i, e)
                      }
                    />
                  ) : null}
                </div>
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
                          operator={item2.operator as string}
                          key={i2 + i}
                          index={i2}
                          indexGroup={i}
                          selected={item2.param as string}
                          value={item2.value as string}
                          setFilterValue={setFilterValue}
                          handleRemoveFilter={() => handleRemoveFilter(i, i2)}
                        />
                      ) : item2.type == "price" ? (
                        <PriceFilter
                          operator={item2.operator as string}
                          index={i2}
                          indexGroup={i}
                          key={i2 + i}
                          setFilterValue={setFilterValue}
                          from={item2.from as string}
                          to={item2.to as string}
                          handleRemoveFilter={() => handleRemoveFilter(i, i2)}
                        />
                      ) : item2.type == "rating" ? (
                        <RatingFilter
                          operator={item2.operator as string}
                          index={i2}
                          indexGroup={i}
                          key={i2 + i}
                          setFilterValue={setFilterValue}
                          ratingSelected={item2.value as string}
                          paramSelected={item2.param as string}
                          handleRemoveFilter={() => handleRemoveFilter(i, i2)}
                        />
                      ) : item2.type == "country of origin" ? (
                        <CountryOfOriginFilter
                          operator={item2.operator as string}
                          key={i2 + i}
                          index={i2}
                          indexGroup={i}
                          selected={item2.param as string}
                          value={item2.value as string}
                          setFilterValue={setFilterValue}
                          handleRemoveFilter={() => handleRemoveFilter(i, i2)}
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
