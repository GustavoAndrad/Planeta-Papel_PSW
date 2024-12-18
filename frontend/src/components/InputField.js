import React from 'react';

const InputField = ({ type, name, placeholder, value, onChange, maxLength }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      maxLength={maxLength}
      className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
    />
  );
};

export default InputField;

