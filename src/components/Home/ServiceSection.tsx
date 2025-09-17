"use client";

export default function ServicesSection() {
  const services = [
    "Verified Property Listings",
    "Buyer-Seller Connection",
    "Real-Time Updates",
    "Property Management Tools",
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-gray-900 dark:text-white">{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
