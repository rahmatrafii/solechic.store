import FormLogin from "@/components/form/FormLogin";
import FormRegister from "@/components/form/FormRegister";
import React from "react";
export async function generateMetadata({
  params,
}: {
  params: { action: string };
}) {
  return {
    title: params.action,
  };
}

const Auth = ({
  params,
  searchParams,
}: {
  params: { action: string };
  searchParams: { r: string };
}) => {
  if (params.action !== "signin" && params.action !== "signup") return null;
  return (
    <>
      <img
        src="/static/image/background.svg"
        alt="background"
        className="h-full w-full object-cover left-0  bottom-0 absolute z-[1]"
      />
      <div className="w-full relative  z-[2] h-screen ">
        <div className=" z-[2]  w-full h-full flex-center">
          <div className="w-[350px] sm:w-[400px] h-auto bg-white border-[2px] p-8">
            <h3 className="text-lg md:text-xl text-center">
              {params.action == "signin" ? "Login" : "Register"}
            </h3>
            <h2 className="text-2xl md:text-4xl  mb-6 text-center">
              {" "}
              SoleChic.store
            </h2>
            {params.action === "signin" ? (
              <FormLogin fromRegister={searchParams.r ? true : false} />
            ) : params.action === "signup" ? (
              <FormRegister />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
