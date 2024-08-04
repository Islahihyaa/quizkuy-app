import React from 'react'

const FormField = ({ input, value, handleChange, options }) => (
    <div className="my-2 w-full">
      <label className="block text-lg font-medium text-gray-700 mb-2">{input.label}</label>
      {input.type === "select" ? (
        <SelectField name={input.name} value={value} handleChange={handleChange} options={options} />
      ) : (
        <input
          type={input.type}
          placeholder={input.placeholder}
          name={input.name}
          value={value}
          onChange={handleChange}
          className="input input-bordered input-info w-full"
        />
      )}
    </div>
  );

export default FormField