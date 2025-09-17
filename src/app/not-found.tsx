"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-green-600 dark:text-green-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        The page you are looking for doesn’t exist or has been moved.  
        Please check the URL or return to the homepage.
      </p>
      <Link href="/">
        <Button size="lg" variant="default">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
}
