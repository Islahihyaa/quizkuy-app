import React from "react";

const SelectField = ({ value, options, handleChange, name }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className="input input-bordered input-info w-full"
    >
      <option value="">Pilih Opsi</option>
      {options.map((option, idx) => (
        <option key={idx} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
