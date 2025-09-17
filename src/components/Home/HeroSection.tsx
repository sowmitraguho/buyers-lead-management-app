"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import heroAnim from "../../../public/lottifiles/realestate.json";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center py-20">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Find Your Dream Property With <span className="text-green-600">EstateConnect</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Connect with verified buyers and sellers easily. Buy, rent, or list properties with ease.
          </p>
          <div className="flex space-x-4">
            <Link href="/properties">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                View Properties
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <Lottie animationData={heroAnim} loop className="w-full h-96" />
        </div>
      </div>
    </section>
  );
}