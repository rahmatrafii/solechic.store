"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import AddFilter from "./AddFilter";
import { FaPlus } from "react-icons/fa6";
import NameFilter from "./NameFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import CountryOfOriginFilter from "./CountryOfOriginFilter";
import DeleteGroup from "./DeleteGroup";
import { FilterGroup, ProductType } from "@/types";
import {
  getProductsFiltered,
  getProductsGroupFiltered,
} from "@/sanity/sanity-utils";
import { useRouter, useSearchParams } from "next/navigation";

import { usePathname } from "next/navigation";
import {
  ganerateCountryOfOriginFilter,
  ganerateNameFilter,
  ganeratePriceFilter,
  ganerateRatingFilter,
} from "@/utils/filterAction";

type Props = {
  setProductsSelected: Dispatch<SetStateAction<ProductType[]>>;
};
const Filter = ({ setProductsSelected }: Props) => {
  const pathName = usePathname();
  const [filterActive, setFilterActive] = useState(false);
  const [filterValue, setfilterValue] = useState<FilterGroup[]>([[]]);
  console.log(filterValue);
  const router = useRouter();

  const handleAddFilter = (group: number, type: string, initial?: string) => {
    if (type !== "price") {
      setfilterValue((prev) => {
        const updatedFilterValue = [...prev];
        updatedFilterValue[group] = [
          ...updatedFilterValue[group],
          {
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
            type: "price",
            from: "",
            to: "",
          },
        ];
        return updatedFilterValue;
      });
    }
  };

  const handleAddGroup = () => {
    if (!filterValue[filterValue.length - 1][0]) return false;
    setfilterValue((prev) => [...prev, []]);
  };

  const handleDeleteGroup = (indexToRemove: number) => {
    if (filterValue.length === 1) return false;
    setfilterValue((prev) => prev.filter((item, i) => i !== indexToRemove));
  };

  const handleDone = async () => {
    setFilterActive(false);

    if (
      filterValue.length === 1 ||
      (filterValue.length === 2 && !filterValue[filterValue.length - 1][0])
    ) {
      // const res = await getProductsFiltered(
      //   pathName.split("/")[2],
      //   filterValue[0]
      // );
      let string: string[] = [];
      filterValue[0].map((value) => {
        if (value.type == "name" && value.value) {
          const res = ganerateNameFilter(
            value as { type: string; param: string; value: string }
          );

          string.push(`${res}`);
        } else if (value.type == "price" && (value.from || value.to)) {
          const res = ganeratePriceFilter(
            value as { type: string; from: string; to: string }
          );

          string.push(`${res}`);
        } else if (value.type == "rating" && value.value) {
          const res = ganerateRatingFilter(
            value as { type: string; param: string; value: string }
          );

          string.push(`${res}`);
        } else if (value.type == "country of origin" && value.value) {
          const res = ganerateCountryOfOriginFilter(
            value as { type: string; param: string; value: string }
          );

          string.push(`${res}`);
        }
      });
      // const url = `http://localhost:3000/products/all?filters=${string}`;
      // window.location.href = url;

      // const query = `${
      //   pathName.split("/")[2] !== "all"
      //     `&& category match "${pathName.split("/")[2]}*"`
      //     : ""
      // }  ${string}]`;
      // console.log(string);

      console.log(string);

      if (pathName.split("/")[2] !== "all" && string.length > 0) {
        string.push(`category match "${pathName.split("/")[2]}*"`);
      }

      console.log(string);

      const searchParams = new URLSearchParams(window.location.search);
      localStorage.setItem(
        `${pathName.split("/")[2]}-filter`,
        JSON.stringify(filterValue)
      );

      searchParams.set("filters", string.join(" && "));
      const newPathName = `${
        window.location.pathname
      }?${searchParams.toString()}`;

      window.location.href = newPathName;
      return false;
    } else if (filterValue.length > 1) {
      // const res = await getProductsGroupFiltered(
      //   pathName.split("/")[2],
      //   filterValue
      // );
      let group: any[] = [];
      filterValue.map((item) => {
        let string = "";
        if (!item[0]) return false;
        item.map((value: any) => {
          if (value.type == "name" && value.value) {
            const res = ganerateNameFilter(
              value as { type: string; param: string; value: string }
            );

            string += ` && ${res}`;
          } else if (value.type == "price" && (value.from || value.to)) {
            const res = ganeratePriceFilter(
              value as { type: string; from: string; to: string }
            );

            string += ` && ${res}`;
          } else if (value.type == "rating" && value.value) {
            const res = ganerateRatingFilter(
              value as { type: string; param: string; value: string }
            );

            string += ` && ${res}`;
          } else if (value.type == "country of origin" && value.value) {
            const res = ganerateCountryOfOriginFilter(
              value as { type: string; param: string; value: string }
            );

            string += ` && ${res}`;
          }
        });
        group.push(
          `(_type == "product" ${
            pathName.split("/")[2] !== "all"
              ? `&& category match "${pathName.split("/")[2]}*"`
              : ""
          } ${string})`
        );
      });

      // const url = `http://localhost:3000/products/all?filters=${group.join(
      //   " || "
      // )}`;
      // window.location.href = url;

      const searchParams = new URLSearchParams(window.location.search);

      searchParams.set("filters", group.join(" || "));
      const newPathName = `${
        window.location.pathname
      }?${searchParams.toString()}`;

      localStorage.setItem(
        `${pathName.split("/")[2]}-filter`,
        JSON.stringify(filterValue)
      );

      // router.push(newPathName);

      window.location.href = newPathName;
      return false;
    }
  };

  useEffect(() => {
    const url = window.location.href;

    const string = url.split("?filters=")[1];
    console.log(decodeURIComponent(string));

    const fil = localStorage.getItem(`${pathName.split("/")[2]}-filter`);
    const ter = JSON.parse(fil as string);
    console.log(ter);
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
          {filterValue.map((item, i) => (
            <div
              className="w-full flex justify-center border border-gray-400 rounded-xl p-2 sm:p-3 md:p-4 mb-6"
              key={i}
            >
              <div className="w-auto mr-2 sm:mr-4 md:mr-5">
                {item.map((item2, i2) =>
                  item2.type == "name" ? (
                    <NameFilter
                      key={i2 + i}
                      index={i2}
                      indexGroup={i}
                      selected={item2.param as string}
                      value={item2.value as string}
                      setFilterValue={setfilterValue}
                    />
                  ) : item2.type == "price" ? (
                    <PriceFilter
                      index={i2}
                      indexGroup={i}
                      key={i2 + i}
                      setFilterValue={setfilterValue}
                      from={filterValue[i][i2].from as string}
                      to={filterValue[i][i2].to as string}
                    />
                  ) : item2.type == "rating" ? (
                    <RatingFilter
                      index={i2}
                      indexGroup={i}
                      key={i2 + i}
                      setFilterValue={setfilterValue}
                      ratingSelected={filterValue[i][i2].value as string}
                      paramSelected={filterValue[i][i2].param as string}
                    />
                  ) : item2.type == "country of origin" ? (
                    <CountryOfOriginFilter
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
                <AddFilter index={i} handleAddFilter={handleAddFilter} />
                <DeleteGroup handleDeleteGroup={() => handleDeleteGroup(i)} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center">
          <button
            className="md:py-2 md:px-4 py-1 px-2 text-xs rounded-md bg-black text-white whitespace-nowrap flex items-center justify-center mr-5"
            onClick={handleAddGroup}
          >
            <span className="mr-3">Add Filter Group</span>
            <FaPlus />
          </button>
          <button
            className="md:py-2 md:px-4 py-1 px-2 text-xs rounded-md bg-black text-white "
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
