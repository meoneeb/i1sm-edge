"use client";
import Link from "next/link";

export default function InventoryList({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <>
      {data.map((item, index) => {
        // Convert MSRP and Price to integers
        const parsePrice = (price) => {
          if (!price) return null;
          return parseInt(
            String(price).replace(/\$/g, "").replace(/,/g, ""),
            10
          );
        };

        const msrpValue = parsePrice(item?.Msrp);
        const priceValue = parsePrice(item?.Price);

        // Calculate savings
        const savings =
          msrpValue && priceValue && msrpValue > priceValue
            ? msrpValue - priceValue
            : null;

        return (
          <div
            key={index}
            className="border border-gray-300 p-4 flex flex-col gap-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between w-full text-left">
              <strong className="text-lg font-semibold text-gray-800">
                {item.Year} {item.Make} {item.Model} {item.Class}
              </strong>
            </div>

            <div className="mt-4">
              <div className="flex gap-4">
                <div>
                  <img
                    src={item?.Photo1 || "/placeholder.jpg"} // Fallback for missing image
                    alt={`${item.Make || "Vehicle"} ${item.Model || ""}`}
                    className="min-w-48 w-48 aspect-square rounded-xl object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between w-full">
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
                  <Link
                    href={`#`}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
