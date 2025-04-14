"use client";
import React, { useEffect } from "react";

export default function Pagination() {
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const limit = 5;
  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold">Pagination</h1>
      <div className=" grid grid-cols-3">
        {products
          .slice(limit * page - limit, page * limit)
          .map((product, index) => {
            return (
              <div
                key={index}
                className="border-2 border-gray-300 p-4 rounded-md "
              >
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p>{product.description}</p>
                <p className="font-bold">${product.price}</p>
              </div>
            );
          })}
      </div>
      {
        <div className="flex gap-2">
          {Array.from(
            { length: Math.ceil(products.length / limit) },
            (_, i) => (
              <button
                key={i}
                className={`px-4 py-2 border rounded-md ${
                  page === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      }
    </div>
  );
}
