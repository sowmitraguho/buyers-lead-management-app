"use client";

import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 bg-green-600 dark:bg-green-700 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Start Listing Your Properties Today!</h2>
      <p className="mb-6">Join EstateConnect and reach thousands of potential buyers.</p>
      <Link href="/auth/signup">
        <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition">
          Sign Up Now
        </button>
      </Link>
    </section>
  );
}
