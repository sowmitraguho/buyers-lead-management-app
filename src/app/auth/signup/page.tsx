"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Lottie from "lottie-react";
import loginAnim from "/public/lottifiles/login.json";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
    console.log({ fullName, email, phone, password, agree });
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phone, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful! Please check your email for verification.");
      window.location.href = "/auth/login";
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
};


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Left Side - Lottie Animation */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Lottie
          animationData={loginAnim}
          loop
          className="w-3/4 h-3/4"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Create your account
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300">
            Join our property dealer platform to manage your listings and clients.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agree"
                  checked={agree}
                  onCheckedChange={(checked) => setAgree(!!checked)}
                  required
                />
                <Label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-300">
                  I agree to the <span className="underline">Terms & Conditions</span>
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Sign Up
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500 dark:text-gray-300 mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 dark:text-blue-400 underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
