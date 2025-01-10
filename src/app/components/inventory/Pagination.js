// components/Pagination.js
import React from "react";

const Pagination = ({
  filteredItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = [];

  // Limit the page numbers shown around the current page (e.g., 2 pages before and after)
  const maxPagesToShow = 5;
  const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  const endPage = Math.min(startPage + maxPagesToShow - 1, pageCount);

  // Generate page numbers based on the calculated range
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pageCount) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-gray-600">Total Units: {filteredItems.length}</p>
      <div className="flex gap-2 items-center">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-white text-gray-600"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === pageNumber
                ? "bg-gray-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === pageCount}
          className={`px-4 py-2 border rounded-md ${
            currentPage === pageCount
              ? "bg-gray-300 text-gray-500"
              : "bg-white text-gray-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
