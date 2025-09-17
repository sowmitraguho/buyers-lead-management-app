"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase"; // your normal client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type PropertyForm = {
  title: string;
  description: string;
  price: number;
  city: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  status: string;
};

export default function AddPropertyPage() {
  const { register, handleSubmit, reset } = useForm<PropertyForm>();
  const [userId, setUserId] = useState<string | null>(null);
  const [data, setData] = useState<{ property_type?: string; status?: string }>({});

  // Get logged-in user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      } else {
        setUserId(uuidv4()); // fallback random UUID
      }
    };
    getUser();
  }, []);

  const onSubmit = async (data: PropertyForm) => {
    try {
      const res = await fetch("/api/properties/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          price: Number(data.price),
          bedrooms: Number(data.bedrooms),
          bathrooms: Number(data.bathrooms),
          seller_id: userId,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Property added successfully!");
        reset();
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Add New Property
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Cozy Apartment in Dhaka" {...register("title")} required />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea className="w-full p-2 border border-gray-300 rounded-md" id="description" placeholder="Write property details..." {...register("description")} required />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="50000" {...register("price")} required />
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Dhaka" {...register("city")} required />
          </div>

          {/* Property Type */}
          <div>
            <Label>Property Type</Label>
            <Select  onValueChange={(value) => setData(prev => ({ ...prev, property_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Land">Land</SelectItem>
                <SelectItem value="Office">Office</SelectItem>
                <SelectItem value="Shop">Shop</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms */}
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" type="number" placeholder="3" {...register("bedrooms")} required />
          </div>

          {/* Bathrooms */}
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" type="number" placeholder="2" {...register("bathrooms")} required />
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Select  onValueChange={(value) => setData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Add Property
          </Button>
        </form>
      </div>
    </div>
  );
}