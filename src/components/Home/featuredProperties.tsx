"use client";

import Link from "next/link";

export default function FeaturedProperties() {
  const properties = [
    { id: 1, title: "Luxury Villa in Chandigarh", price: "₹1.2 Cr", location: "Chandigarh" },
    { id: 2, title: "2BHK Apartment in Mohali", price: "₹45 Lakh", location: "Mohali" },
    { id: 3, title: "Office Space in Panchkula", price: "₹75 Lakh", location: "Panchkula" },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <div key={prop.id} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition">
              <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{prop.title}</h3>
              <p className="text-green-600 font-bold">{prop.price}</p>
              <p className="text-gray-500 dark:text-gray-400">{prop.location}</p>
              <Link href={`/properties/${prop.id}`}>
                <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
