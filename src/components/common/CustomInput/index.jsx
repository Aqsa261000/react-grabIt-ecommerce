import React from "react";

const CustomInput = ({
  labelName,
  placeholder,
  type,
  value,
  onChange,
  id,
  name,
  htmlFor,
  error,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={htmlFor} className="font-semibold">
        {labelName}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-gray-200 px-5 py-4 outline-none"
        value={value}
        onChange={onChange}
        id={id}
        name={name}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CustomInput;
