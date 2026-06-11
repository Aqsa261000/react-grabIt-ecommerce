import React, { useState } from "react";
import { CarouselImage1 } from "../../../../assets";
import { CustomInput } from "../../../common";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../../../schemas/signUpSchema";
import { signupUser } from "../../../../services/authService";

const SignUpDefault = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmitHandler = async (data) => {
    try {
      setError("");
      await signupUser(data);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Login failed, please try again.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 items-center justify-center h-full w-full">
      <img
        src={CarouselImage1}
        alt="signup-image"
        className="hidden md:block h-full w-full object-cover"
      />
      <form className="px-4" onSubmit={handleSubmit(onSubmitHandler)}>
        <h1 className="font-bold text-3xl pb-5">Sign Up</h1>
        <div className="grid gap-5 text-lg">
          <CustomInput
            labelName={"Full Name"}
            placeholder={"Enter your full name"}
            type={"text"}
            id="fullName"
            name="fullName"
            htmlFor={"fullName"}
            register={register("fullName")}
            error={errors.fullName?.message}
          />

          <CustomInput
            labelName={"Email Address"}
            placeholder={"Enter your email address"}
            type={"email"}
            id="emailAddress"
            name="emailAddress"
            register={register("emailAddress")}
            error={errors.emailAddress?.message}
          />

          <CustomInput
            labelName={"Password"}
            placeholder={"Enter your password"}
            type={"password"}
            id="password"
            name="password"
            register={register("password")}
            error={errors.password?.message}
          />

          <CustomInput
            labelName={"Confirm Password"}
            placeholder={"Confirm your password"}
            type={"password"}
            id="confirmPassword"
            name="confirmPassword"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-black hover:bg-gray-700 text-xl px-15 py-4 rounded-xl text-white font-bold mb-2 mt-5"
        >
          Sign Up
        </button>
        <p className="text-lg">
          Already have an account?{" "}
          <Link className="underline" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpDefault;
