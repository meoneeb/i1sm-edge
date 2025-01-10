// components/Filter.js
import React, { useEffect, useState } from "react";

const Filter = ({ items, setFilteredItems }) => {
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    color: "",
  });

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Extract unique makes, models, and colors from the items
    const uniqueMakes = [...new Set(items.map((item) => item?.Make?.[0]))];
    setMakes(uniqueMakes);

    // If a make is selected, filter models by the selected make
    if (filters.make) {
      const filteredModels = [
        ...new Set(
          items
            .filter((item) => item?.Make?.[0] === filters.make)
            .map((item) => item?.Model?.[0])
        ),
      ];
      setModels(filteredModels);
    } else {
      setModels([]);
    }

    // If a make and model are selected, filter colors by the selected make and model
    if (filters.make && filters.model) {
      const filteredColors = [
        ...new Set(
          items
            .filter(
              (item) =>
                item?.Make?.[0] === filters.make && item?.Model?.[0] === filters.model
            )
            .map((item) => item?.Color?.[0])
        ),
      ];
      setColors(filteredColors);
    } else {
      setColors([]);
    }
  }, [filters, items]);

  useEffect(() => {
    // Filter the items based on selected filters
    const filterItems = () => {
      let filtered = items;

      if (filters.make) {
        filtered = filtered.filter((item) =>
          item?.Make?.[0]?.toLowerCase().includes(filters.make.toLowerCase())
        );
      }

      if (filters.model) {
        filtered = filtered.filter((item) =>
          item?.Model?.[0]?.toLowerCase().includes(filters.model.toLowerCase())
        );
      }

      if (filters.color) {
        filtered = filtered.filter((item) =>
          item?.Color?.[0]?.toLowerCase().includes(filters.color.toLowerCase())
        );
      }

      setFilteredItems(filtered);
    };

    filterItems();
  }, [filters, items, setFilteredItems]);

  // Reset the filters
  const resetFilters = () => {
    setFilters({
      make: "",
      model: "",
      color: "",
    });
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Make:
          <select
            value={filters.make}
            onChange={(e) => setFilters({ ...filters, make: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Make</option>
            {makes.map((make, index) => (
              <option key={index} value={make}>
                {make}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Model:
          <select
            value={filters.model}
            onChange={(e) => setFilters({ ...filters, model: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!filters.make}
          >
            <option value="">Select Model</option>
            {models.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Color:
          <select
            value={filters.color}
            onChange={(e) => setFilters({ ...filters, color: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!filters.model}
          >
            <option value="">Select Color</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        onClick={resetFilters}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filter;
