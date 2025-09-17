"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative bg-green-100 dark:bg-green-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 dark:text-green-100">
            About EstateConnect
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-800 dark:text-gray-200">
            Connecting buyers and sellers seamlessly in the real estate world.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-300">
            EstateConnect started with a simple mission: to make property buying and selling easier, transparent, and trustworthy. 
            Our platform brings together buyers, sellers, and agents under one roof, providing real-time updates and reliable data.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/about-us.jpg" // replace with your own image
            alt="Our Story"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300">
              To simplify the property market for everyone by providing a user-friendly platform that connects buyers and sellers efficiently.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
            <p className="text-gray-700 dark:text-gray-300">
              To be the leading property platform in the country, trusted for reliability, transparency, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Example Team Members */}
          {[
            { name: "Alice Johnson", role: "Founder & CEO", img: "/team1.jpg" },
            { name: "Bob Smith", role: "CTO", img: "/team2.jpg" },
            { name: "Clara Lee", role: "Marketing Head", img: "/team3.jpg" },
            { name: "David Kim", role: "Product Manager", img: "/team4.jpg" },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <Image
                src={member.img}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4 shadow-lg"
              />
              <h4 className="font-semibold text-lg">{member.name}</h4>
              <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-100 dark:bg-green-900 py-16 text-center">
        <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">
          Join EstateConnect Today
        </h2>
        <p className="mt-4 text-gray-800 dark:text-gray-200">
          Start exploring properties or list your own in just a few clicks.
        </p>
        <a
          href="/auth/signup"
          className="mt-6 inline-block px-6 py-3 bg-green-600 dark:bg-green-500 text-white rounded-md font-semibold hover:bg-green-700 dark:hover:bg-green-400 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}