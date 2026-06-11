import React, { useContext, useState } from "react";
import { CarouselImage1 } from "../../../../assets";
import { CustomInput } from "../../../common";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../../schemas/loginSchema";
import AuthContext from "../../../../context/Auth/AuthContext";

const LoginDefault = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const onSubmitHandler = async (data) => {
    try {
      setError("");
      await login(data, navigate);
    } catch (err) {
      setError(err.message || "Login failed, please try again.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 items-center justify-center h-full w-full">
      <img
        src={CarouselImage1}
        alt="signup-image"
        className="hidden md:block h-full w-full object-cover"
      />
      <form className="px-4" onSubmit={handleSubmit(onSubmitHandler)}>
        <h1 className="font-bold text-3xl pb-5">Login</h1>
        <div className="grid gap-5 text-lg">
          <CustomInput
            labelName={"Email Address"}
            placeholder={"Enter your email address"}
            inputType={"email"}
            id="emailAddress"
            name="emailAddress"
            register={register("emailAddress")}
            error={errors.emailAddress?.message}
          />

          <CustomInput
            labelName={"Password"}
            placeholder={"Enter your password"}
            inputType={"password"}
            id="password"
            name="password"
            register={register("password")}
            error={errors.password?.message}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-black hover:bg-gray-700 text-xl px-15 py-4 rounded-xl text-white font-bold mb-2 mt-5"
        >
          Login
        </button>
        <p className="text-lg">
          Dont have an account?{" "}
          <Link className="underline" to={"/signup"}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginDefault;
