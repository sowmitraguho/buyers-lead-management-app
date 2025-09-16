"use client";

import { useState } from "react";
import { buyerCreateSchema, BuyerCreateInput, PropertyTypeEnum, BHKEnum, CityEnum, PurposeEnum, TimelineEnum, SourceEnum } from "@/lib/schemas/buyerSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function NewBuyerPage() {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    fullName: "",
    email: "",
    phone: "",
    city: "Chandigarh",
    propertyType: "Apartment",
    bhk: "",
    purpose: "Buy",
    budgetMin: "",
    budgetMax: "",
    timeline: "Exploring",
    source: "Website",
    notes: "",
    tags: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // small helper to update form
  const update = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // client-side validation using zod
    const parsed = buyerCreateSchema.safeParse({
      ...form,
      // ensure numeric fields are passed correctly (zod preprocess handles strings)
    });

    if (!parsed.success) {
      const zErrs: Record<string, string> = {};
      parsed.error.errors.forEach(err => {
        const path = err.path[0] ?? "_";
        zErrs[path as string] = err.message;
      });
      setErrors(zErrs);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/buyers/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await res.json();
      if (!res.ok) {
        // server validation errors might be an array (zod) or message
        if (data?.error) {
          // if it's array of zod errors
          if (Array.isArray(data.error)) {
            const zErrs: Record<string, string> = {};
            data.error.forEach((err: any) => {
              const path = err.path?.[0] ?? "_";
              zErrs[path] = err.message;
            });
            setErrors(zErrs);
          } else {
            alert(data.error);
          }
        } else {
          alert("Failed to create buyer");
        }
      } else {
        // success
        alert("Buyer created");
        router.push("/buyers"); // redirect to buyers list
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const propertyType = form.propertyType;
  const bhkRequired = propertyType === "Apartment" || propertyType === "Villa";

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow rounded p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">New Buyer</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={form.fullName} onChange={e => update("fullName", e.target.value)} />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" value={form.email} onChange={e => update("email", e.target.value)} />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={form.phone} onChange={e => update("phone", e.target.value)} />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div>
              <Label>City</Label>
              <Select value={form.city} onValueChange={val => update("city", val)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="City" /></SelectTrigger>
                <SelectContent>
                  {["Chandigarh","Mohali","Zirakpur","Panchkula","Other"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
            </div>

            <div>
              <Label>Property Type</Label>
              <Select value={form.propertyType} onValueChange={val => update("propertyType", val)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Property Type" /></SelectTrigger>
                <SelectContent>
                  {["Apartment","Villa","Plot","Office","Retail"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.propertyType && <p className="text-sm text-red-500">{errors.propertyType}</p>}
            </div>
          </div>

          {bhkRequired && (
            <div>
              <Label>BHK</Label>
              <Select value={form.bhk} onValueChange={val => update("bhk", val)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select BHK" /></SelectTrigger>
                <SelectContent>
                  {["1","2","3","4","Studio"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.bhk && <p className="text-sm text-red-500">{errors.bhk}</p>}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Purpose</Label>
              <Select value={form.purpose} onValueChange={val => update("purpose", val)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Purpose" /></SelectTrigger>
                <SelectContent>
                  {["Buy","Rent"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Timeline</Label>
              <Select value={form.timeline} onValueChange={val => update("timeline", val)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Timeline" /></SelectTrigger>
                <SelectContent>
                  {["0-3m","3-6m",">6m","Exploring"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Budget Min (INR)</Label>
              <Input type="number" value={form.budgetMin} onChange={e => update("budgetMin", e.target.value)} />
              {errors.budgetMin && <p className="text-sm text-red-500">{errors.budgetMin}</p>}
            </div>

            <div>
              <Label>Budget Max (INR)</Label>
              <Input type="number" value={form.budgetMax} onChange={e => update("budgetMax", e.target.value)} />
              {errors.budgetMax && <p className="text-sm text-red-500">{errors.budgetMax}</p>}
            </div>
          </div>

          <div>
            <Label>Source</Label>
            <Select value={form.source} onValueChange={val => update("source", val)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Source" /></SelectTrigger>
              <SelectContent>
                {["Website","Referral","Walk-in","Call","Other"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Notes (optional)</Label>
            <textarea className="w-full p-2 rounded border bg-transparent" rows={4} value={form.notes} onChange={e => update("notes", e.target.value)} />
            {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
          </div>

          <div>
            <Label>Tags (comma separated)</Label>
            <Input value={(form.tags || []).join(",")} onChange={e => update("tags", e.target.value.split(",").map((s:any)=>s.trim()).filter(Boolean))} />
            {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Create Buyer"}</Button>
            <Button variant="ghost" onClick={() => router.push("/buyers")}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
