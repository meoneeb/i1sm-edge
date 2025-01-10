"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function InventoryList({ data }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      setError("Failed to load data");
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-10">
        <p>{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 p-10">No data available</p>;
  }

  return (
    <>
      {data.map((item, index) => {
        const parsePrice = (price) => {
          if (!price) return null;
          return parseInt(
            String(price).replace(/\$/g, "").replace(/,/g, ""),
            10
          );
        };

        const msrpValue = parsePrice(item?.Msrp);
        const priceValue = parsePrice(item?.Price);

        const savings =
          msrpValue && priceValue && msrpValue > priceValue
            ? msrpValue - priceValue
            : null;

        return (
          <div
            key={index}
            className="border border-gray-300 p-4 flex flex-col gap-4 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex justify-between w-full text-left">
              <strong className="text-lg font-semibold text-gray-800">
                {item.Year} {item.Make} {item.Model} {item.Class}
              </strong>
            </div>

            <div className="">
              <div className="flex gap-4">
                <div>
                  <img
                    src={item?.Photo1 || "/placeholder.jpg"}
                    alt={`${item.Make || "Vehicle"} ${item.Model || ""}`}
                    className="min-w-48 w-48 aspect-square rounded-xl object-cover"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="grid grid-cols-1 gap-2">
                    {msrpValue && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Retail Price:
                        </span>
                        <span className="text-gray-900">
                          ${msrpValue.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {priceValue && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Sale Price:
                        </span>
                        <span className="text-gray-900">
                          ${priceValue.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {savings && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          You Save:
                        </span>
                        <span className="text-green-600 font-bold">
                          ${savings.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {item.Color && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Color:
                        </span>
                        <span className="text-gray-900">{item.Color}</span>
                      </div>
                    )}
                    {item.Stocknumber && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          Stock #:
                        </span>
                        <span className="text-gray-900">
                          {item.Stocknumber}
                        </span>
                      </div>
                    )}
                    {item.Vin && (
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          VIN:
                        </span>
                        <span className="text-gray-900">{item.Vin}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-2">
              <Link
                href={`#`}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-gray-800 text-center"
              >
                Get E-Price
              </Link>
              <Link
                href={`#`}
                className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 text-center"
              >
                Get Pre-Approved
              </Link>
              <Link
                href={`#`}
                className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
