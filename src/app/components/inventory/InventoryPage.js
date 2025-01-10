"use client";
import { useState, useEffect } from "react";
import { fetchAndParseXml } from "@/utils/fetchXml";
import InventoryList from "./InventoryList";
import Filter from "./Filter";
import Pagination from "./Pagination";
import ResultCount from "./ResultCount";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Separate loading states for each component
  const [loadingItems, setLoadingItems] = useState(true); // Loading for items
  const [loadingFilter, setLoadingFilter] = useState(true); // Loading for filter
  const [loadingPagination, setLoadingPagination] = useState(true); // Loading for pagination

  // Fetch and parse XML data
  useEffect(() => {
    const fetchData = async () => {
      const xmlUrl =
        "https://psxdigital.com/powersports-marketing-automation/hooks/inventory/em/website";

      try {
        setLoadingItems(true); // Set loading for items to true
        const parsedXml = await fetchAndParseXml(xmlUrl);
        const itemsData = parsedXml?.inventory?.unit || [];

        setItems(itemsData);
        setFilteredItems(itemsData); // Set all items initially
      } catch (error) {
        console.error("Error fetching data:", error);
        setFilteredItems([]); // In case of error, clear the items
      } finally {
        setLoadingItems(false); // Set loading for items to false after data is fetched
      }
    };

    fetchData();
  }, []);

  // Handle filter change
  useEffect(() => {
    if (items.length > 0) {
      setLoadingFilter(false); // Set filter loading to false once items are available
    }
  }, [items]);

  // Handle pagination change
  useEffect(() => {
    if (filteredItems.length > 0) {
      setLoadingPagination(false); // Set pagination loading to false once filtered items are available
    }
  }, [filteredItems]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto w-full px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>

        <div className="flex w-full space-x-8">
          <div className="w-1/3">
            {/* Filter Component */}

            <Filter items={items} setFilteredItems={setFilteredItems} />
          </div>
          <div className="w-2/3">
            {/* Inventory List */}
            <div className="grid grid-cols-1 gap-6">
              {/* <ResultCount setFilteredItems={filteredItems} /> */}
              <p>Available Units: {filteredItems.length}</p>
              {loadingPagination ? (
                <div className="flex justify-center items-center p-10">
                  <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
              ) : (
                <InventoryList data={currentItems} />
              )}
            </div>

            {/* Pagination Component */}
            {!loadingPagination && (
              <Pagination
                filteredItems={filteredItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
