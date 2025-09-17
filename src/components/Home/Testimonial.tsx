"use client";

export default function Testimonials() {
  const testimonials = [
    { name: "Rohit Sharma", feedback: "Found my dream home within days!" },
    { name: "Priya Kaur", feedback: "Easy and smooth process, highly recommended." },
  ];

  return (
    <section className="py-16 bg-green-50 dark:bg-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-gray-700 dark:text-gray-200">"{t.feedback}"</p>
              <p className="mt-2 font-semibold text-gray-900 dark:text-white">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
