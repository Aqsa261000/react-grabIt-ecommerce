import React from "react";

const CustomInput = ({
  labelName,
  placeholder,
  type,
  id,
  name,
  htmlFor,
  error,
  register,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={htmlFor || id} className="font-semibold">
        {labelName}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        {...register}
        {...rest}
        className={`px-5 py-4 outline-none border ${error ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-100"}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CustomInput;
