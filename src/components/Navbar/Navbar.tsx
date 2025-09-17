"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { supabase } from "@/lib/supabase";
import { LogoutButton } from "../LogOutButton/LogoutButton";

export default function Navbar({userProp}: {userProp?: any}) {
    const [user, setUser] = useState<any>(userProp || null);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    // useEffect(() => {
    //     // get logged in user
    //     const getUser = async () => {
    //         const {
    //             data: { user },
    //         } = await supabase.auth.getUser();
    //         setUser(user);
    //         console.log("Current User:", user);
    //     };
    //     getUser();

    //     // subscribe to auth changes
    //     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    //         setUser(session?.user || null);
    //     });

    //     return () => listener.subscription.unsubscribe();
    // }, []);

    return (
        <nav className="bg-green-100 dark:bg-green-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="text-green-900 dark:text-green-100 font-bold text-2xl">
                        EstateConnect
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <Link
                            href="/"
                            className={`px-3 py-2 rounded-md font-medium ${pathname === "/" ? "bg-green-300 dark:bg-green-700" : "hover:bg-green-200 dark:hover:bg-green-800"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/buyers"
                            className={`px-3 py-2 rounded-md font-medium ${pathname === "/buyers" ? "bg-green-300 dark:bg-green-700" : "hover:bg-green-200 dark:hover:bg-green-800"
                                }`}
                        >
                            All Buyers
                        </Link>
                        <Link
                            href="/properties"
                            className={`px-3 py-2 rounded-md font-medium ${pathname === "/properties" ? "bg-green-300 dark:bg-green-700" : "hover:bg-green-200 dark:hover:bg-green-800"
                                }`}
                        >
                            All Properties
                        </Link>
                        <Link
                            href="/contact"
                            className={`px-3 py-2 rounded-md font-medium ${pathname === "/contact" ? "bg-green-300 dark:bg-green-700" : "hover:bg-green-200 dark:hover:bg-green-800"
                                }`}
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/about"
                            className={`px-3 py-2 rounded-md font-medium ${pathname === "/about" ? "bg-green-300 dark:bg-green-700" : "hover:bg-green-200 dark:hover:bg-green-800"
                                }`}
                        >
                            About Us
                        </Link>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-2">
                        {/* Theme Toggler */}
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        >
                            {theme === "light" ? "🌙" : "☀️"}
                        </Button>

                        {/* Auth Buttons */}
                        {!user ? (
                            <>
                                <Link href="/auth/login">
                                    <Button size="sm" variant="default">Login</Button>
                                </Link>
                                <Link href="/auth/signup">
                                    <Button size="sm" variant="default">Sign Up</Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/buyers/new">
                                    <Button size="sm" variant="default">Add Property</Button>
                                </Link>
                                <Link href="/add-buyer">
                                    <Button size="sm" variant="default">Add Buyer</Button>
                                </Link>
                                <LogoutButton />
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            {/* Mobile menu toggle logic will be added here later */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
