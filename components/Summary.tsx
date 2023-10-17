"use client";
import getStripe from "@/lib/stripe";
import { CartProducType } from "@/types";
import React, { useEffect, useState } from "react";

const Summary = ({ products }: { products: CartProducType[] }) => {
  const [subtotal, setSubtotal] = useState("0");
  const [total, setTotal] = useState("0");
  const [quantity, setQuantity] = useState(0);
  function generateSummary() {
    const prevSubtotal = products?.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    const prevQuantity = products?.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);

    const newSubtotal = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(prevSubtotal);
    const newTotal = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(prevSubtotal);
    setQuantity(prevQuantity);
    setSubtotal(newSubtotal);
    setTotal(newTotal);
  }
  useEffect(() => {
    generateSummary();
  }, [products]);
  const handleCheckout = async () => {
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    const result = await res.json();
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: result?.data?.id,
    });
    console.warn(error.message);
  };
  return (
    <div className="py-8 lg:py-0 border-y-2  lg:border-none w-full">
      <h1 className="text-2xl font-bold mb-3">Summary</h1>
      <div>
        <div className="flex w-full justify-between items-center mb-2 font-medium text-base">
          <p className="">
            Subtotal <span>({quantity}) items</span>
          </p>
          <p>$ {subtotal}</p>
        </div>
        <div className="flex w-full justify-between items-center mb-2 font-medium text-base">
          <p className="">Estimated Delivery & Handling</p>
          <p>Free</p>
        </div>

        <div className="flex w-full justify-between items-center mb-2 font-bold text-base py-2 lg:border-y-2">
          <p className="">Total</p>
          <p>$ {total}</p>
        </div>
      </div>
      <div className="fixed z-[2] lg:relative w-full left-0 bottom-0 h-[100px] py-4 bg-white px-1 shadow-up lg:shadow-none lg:border-none">
        <button
          onClick={handleCheckout}
          className="w-full py-3 text-white bg-black rounded-full"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Summary;
