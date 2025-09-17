"use client";

export default function AuthenticatedBuyers() {
  const buyers = [
    { id: 1, name: "Alice Johnson", city: "Chandigarh" },
    { id: 2, name: "Bob Singh", city: "Mohali" },
    { id: 3, name: "Clara Patel", city: "Panchkula" },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Authenticated Buyers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {buyers.map((buyer) => (
            <div key={buyer.id} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{buyer.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{buyer.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}