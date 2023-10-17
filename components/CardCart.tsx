"use client";
import { allSize, maxQuantity } from "@/public/constat";
import { urlFor } from "@/sanity/sanity-utils";
import { CartProducType } from "@/types";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { VscTrash } from "react-icons/vsc";

const CardCart = ({ product }: { product: CartProducType }) => {
  const [size, setSize] = useState(product?.size);
  const [Quantity, setQuantity] = useState(product?.quantity);
  const router = useRouter();
  const handleChangeSize = async (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
    const data = {
      _id: product._id,
      size: Number(e.target.value),
    };

    try {
      await fetch("/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeQuantity = async (e: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
    const data = {
      _id: product._id,
      quantity: Number(e.target.value),
    };

    try {
      await fetch("/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    const data = {
      _id: product._id,
      size: size,
    };

    try {
      await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card flex w-full border-t-[2px] py-5 min-[200px]">
      <div className=" mr-3 sm:mr-6 overflow-hidden w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] ">
        <img
          src={urlFor(product?.image)}
          className="w-full h-auto object-cover"
          alt={product?.name}
        />
      </div>
      <div className="sm:flex w-full flex-row-reverse justify-between">
        <p className="text-xl font-medium mb-0.5">$ {product.price}</p>
        <div>
          <h4 className="text-lg mb-0.5 font-medium ">{product.name}</h4>
          <p className="mb-1 font-medium text-slate-500">Men's Shoes</p>
          <div className="flex gap-4 mb-7">
            <div>
              <label className="mr-2" htmlFor="size">
                Size
              </label>
              <select
                name="size"
                className="border"
                id="size"
                value={size}
                onChange={handleChangeSize}
              >
                {allSize.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mr-2" htmlFor="qty">
                Quantity
              </label>
              <select
                name="qty"
                id="qty"
                className="border"
                value={Quantity}
                onChange={handleChangeQuantity}
              >
                {maxQuantity.map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="text-2xl" onClick={handleDelete}>
            <VscTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCart;
