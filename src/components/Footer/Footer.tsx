"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Branding */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">EstateConnect</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connecting buyers and sellers seamlessly. Find your dream property today!
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </Button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-600 dark:hover:text-green-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/properties" className="hover:text-green-600 dark:hover:text-green-400">
                Properties
              </Link>
            </li>
            <li>
              <Link href="/buyers" className="hover:text-green-600 dark:hover:text-green-400">
                Buyers
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-600 dark:hover:text-green-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-600 dark:hover:text-green-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p>Email: support@estateconnect.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: 123 Estate Street, City, Country</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="#"
              className="hover:text-blue-500 dark:hover:text-blue-300"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:text-pink-600 dark:hover:text-pink-400"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 mt-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} EstateConnect. All rights reserved.
      </div>
    </footer>
  );
}
