// pages/InventoryPage.js
"use client";
import { useState, useEffect } from "react";
import { fetchAndParseXml } from "@/utils/fetchXml";
import InventoryList from "./InventoryList";
import Filter from "./Filter";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    color: "",
  });

  // Fetch and parse XML data
  useEffect(() => {
    const fetchData = async () => {
      const xmlUrl =
        "https://psxdigital.com/powersports-marketing-automation/hooks/inventory/em/website";

      const parsedXml = await fetchAndParseXml(xmlUrl);
      const itemsData = parsedXml?.inventory?.unit || [];

      setItems(itemsData);
      setFilteredItems(itemsData); // Set all items initially
    };

    fetchData();
  }, []);

  // Filter items based on selected filters
  useEffect(() => {
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
  }, [filters, items]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto w-full px-6">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>

        {/* Filter Component */}
        <Filter items={items} filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 gap-6">
          <InventoryList data={currentItems} />
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600">Total Units: {filteredItems.length}</p>
          <div className="flex gap-2">
            {Array.from(
              { length: Math.ceil(filteredItems.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
