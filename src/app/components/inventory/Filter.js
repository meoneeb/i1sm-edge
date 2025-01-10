"use client";
import { useState, useEffect } from "react";

const Filter = ({ items, filters, setFilters, getAvailableOptions }) => {
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);

  useEffect(() => {
    setMakeOptions(getAvailableOptions("make"));
    if (filters.make) {
      setModelOptions(getAvailableOptions("model"));
      setColorOptions(getAvailableOptions("color"));
    } else {
      setModelOptions([]);
      setColorOptions([]);
    }
  }, [filters, items, getAvailableOptions]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mb-4 flex gap-4">
      <select
        name="make"
        value={filters.make}
        onChange={handleFilterChange}
        className="border p-2 rounded-md"
      >
        <option value="">Filter by Make</option>
        {makeOptions.map((make, index) => (
          <option key={index} value={make}>
            {make}
          </option>
        ))}
      </select>

      {filters.make && (
        <>
          <select
            name="model"
            value={filters.model}
            onChange={handleFilterChange}
            className="border p-2 rounded-md"
          >
            <option value="">Filter by Model</option>
            {modelOptions.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>

          <select
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
            className="border p-2 rounded-md"
          >
            <option value="">Filter by Color</option>
            {colorOptions.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default Filter;
