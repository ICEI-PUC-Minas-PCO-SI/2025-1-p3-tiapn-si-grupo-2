import React from "react";

const SelectFuncionarios = ({ title, options, name, value, onChange }) => {
  return (
    <div>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
      >
        <option value="">Selecione um responsável</option>
        {options.map((option) => (
          <option key={option.idUsuario} value={option.idUsuario.toString()}>
            {option.Nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFuncionarios;
