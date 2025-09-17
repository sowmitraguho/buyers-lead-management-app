"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Lottie from "lottie-react";
import loginAnim from "../../../../public/lottifiles/login.json";
import { login } from "./action";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
    // try {
    //   const res = await fetch("/api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await res.json();

    //   if (res.ok) {
    //     alert("Login successful!");
    //     console.log("Login Response:", data);
    //     // Optional: redirect to buyers page
    //     window.location.href = "/buyers";
    //   } else {
    //     alert(data.error);
    //   }
    // } catch (err) {
    //   console.error(err);
    //   alert("Something went wrong!");
    // }
    const result = login({ email, password });
    if(result){
      if('error' in result){
        alert(result.error);
      } else {
        alert("Login successful!");
        window.location.href = "/buyers";
      }};
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
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300">
            Login to manage your property listings and clients
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(checked) => setRemember(!!checked)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-300">
                    Remember me
                  </Label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Log In
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500 dark:text-gray-300 mt-4">
            Don’t have an account?{" "}
            <a href="/auth/signup" className="text-blue-600 dark:text-blue-400 underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
