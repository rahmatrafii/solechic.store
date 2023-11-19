"use client";
import { ProductType } from "@/types";
import { GenerateRateing } from "@/utils/generateRating";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SelectSize from "./SelectSize";
import Alert from "./Alert";

const DetailProductInfo = ({ product }: { product: ProductType }) => {
  const [size, setSize] = useState<number>(0);
  const [errorSize, setErrorSize] = useState("");
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
    status: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const { data: session, status } = useSession();

  const handleAddToCart = async () => {
    if (status === "unauthenticated") {
      push("/auth/signin");
      return false;
    }
    if (size === 0) {
      setErrorSize("Please choose the size");
      return false;
    }
    setIsLoading(true);

    const data = {
      user_email: session?.user?.email,
      _id: product._id,
      image: product?.image[0],
      name: product?.name,
      category: product?.category,
      price: product?.price,
      color: product?.colour,
      origin: product?.origin,
      size: size,
      quantity: 1,
    };
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();

      const productName = response?.res?.data[0]?.name;
      if (response.res.status) {
        setFeedback((prev) => ({
          ...prev,
          message: `${productName || "shoes"} added To Cart ✔`,
          type: "feedback",
          status: true,
        }));
      } else {
        setFeedback((prev) => ({
          ...prev,
          message: `${productName || "shoes"} Failed added To Cart`,
          type: "error",
          status: true,
        }));
      }
    } catch (error: any) {
      setFeedback((prev) => ({
        ...prev,
        message: `Failed added To Cart`,
        type: "error",
        status: true,
      }));
    } finally {
      setErrorSize("");
      setIsLoading(false);
    }

    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, status: false }));
    }, 6000);
  };

  const handleBuyNow = async () => {
    if (status === "unauthenticated") {
      push("/auth/signin");
      return false;
    }
    if (size === 0) {
      setErrorSize("Please choose the size");
      return false;
    }
    setIsLoading(true);

    const data = {
      user_email: session?.user?.email,
      _id: product._id,
      image: product?.image[0],
      name: product?.name,
      category: product?.category,
      price: product?.price,
      color: product?.colour,
      origin: product?.origin,
      size: size,
      quantity: 1,
    };
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();

      const productName = response?.res?.data[0]?.name;
      if (response.res.status) {
        push("/cart");
      } else {
        setFeedback((prev) => ({
          ...prev,
          message: `${productName || "shoes"} Failed added To Cart`,
          type: "error",
          status: true,
        }));
      }
    } catch (error: any) {
      setFeedback((prev) => ({
        ...prev,
        message: `Failed added To Cart`,
        type: "error",
        status: true,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold ">{product.name}</h2>
      <h4 className="mb-3">{product.category}</h4>
      <p className="text-2xl mb-3">$ {product.price}</p>
      <p className="mb-3 md:text-lg text-sm">{product.description}</p>
      <p className="md:text-lg text-sm mb-3"> Colour Shown: {product.colour}</p>
      <p className="md:text-lg text-sm mb-10">
        {" "}
        Country/Region of Origin: {product.origin}
      </p>

      <SelectSize size={size} setSize={setSize} error={errorSize} />

      <button
        disabled={isLoading}
        onClick={handleAddToCart}
        className="w-full py-3 rounded-full  bg-black text-white hover:bg-opacity-60 transition-all duration-200 mb-3"
      >
        Add to Cart
      </button>
      <button
        disabled={isLoading}
        onClick={handleBuyNow}
        className="w-full py-3 rounded-full text-black border-2 border-black  mb-10 hover:text-white hover:bg-slate-600 transition-all duration-200"
      >
        Buy Now
      </button>

      <div className="flex gap-4 items-center">
        <div className="flex gap-3">
          {GenerateRateing(product?.rate, 30, 30)}
        </div>
        <p className="text-lg whitespace-nowrap md:text-xl font-light">
          {product?.rate} Stars
        </p>
      </div>
      <Alert
        isShow={feedback.status}
        type={feedback.type}
        message={feedback.message}
      />
    </div>
  );
};

export default DetailProductInfo;
