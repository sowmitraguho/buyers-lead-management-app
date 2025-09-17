"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";

export default function BuyerDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [buyer, setBuyer] = useState<any>(null);

    const fetchBuyer = async () => {
        try {
            const res = await fetch(`/api/buyers/${id}`);
            const data = await res.json();
            console.log("Fetched buyer data:", data);
            setBuyer(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch buyer data");
        }
    };

    useEffect(() => {
        fetchBuyer();
        //console.log("Fetching buyer with ID:", id, buyer);
    }, []);

    const handleChange = (field: string, value: any) => {
        setBuyer((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/buyers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buyer),
            });
            const data = await res.json();
            console.log("Update response:", data);
            if (data && !data.error) {
                toast.success("Buyer updated successfully!");
                setBuyer(data);
                router.push("/buyers");
            } else {
                console.error(data);
                toast.error("Update failed. Check console for details.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Buyer Details</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        value={buyer.fullName || ""}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={buyer.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        value={String(buyer.phone) || ""}
                        onChange={(e) => handleChange("phone", String(e.target.value))}
                    />
                </div>

                <div>
                    <Label htmlFor="city">City</Label>
                    <select
                        id="city"
                        value={buyer.city}
                        onChange={(e) => handleChange("city", e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1))}
                        className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option>Chandigarh</option>
                        <option>Mohali</option>
                        <option>Zirakpur</option>
                        <option>Panchkula</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <select
                        id="propertyType"
                        value={buyer.propertyType}
                        onChange={(e) => handleChange("propertyType", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option>Apartment</option>
                        <option>Villa</option>
                        <option>Plot</option>
                        <option>Office</option>
                        <option>Retail</option>
                    </select>
                </div>

                {(buyer.propertyType === "Apartment" || buyer.propertyType === "Villa") && (
                    <div>
                        <Label htmlFor="bhk">BHK</Label>
                        <select
                            id="bhk"
                            value={buyer.bhk || ""}
                            onChange={(e) => handleChange("bhk", String(e.target.value))}
                            className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option value="">Select BHK</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>Studio</option>
                        </select>
                    </div>
                )}

                <div>
                    <Label htmlFor="purpose">Purpose</Label>
                    <select
                        id="purpose"
                        value={buyer.purpose}
                        onChange={(e) => handleChange("purpose", e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1))}
                        className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option>Buy</option>
                        <option>Rent</option>
                    </select>
                </div>

                <div className="flex space-x-4">
                    <div>
                        <Label htmlFor="budgetMin">Budget Min (INR)</Label>
                        <Input
                            id="budgetMin"
                            type="number"
                            value={buyer.budgetMin || ""}
                            onChange={(e) => handleChange("budgetMin", Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <Label htmlFor="budgetMax">Budget Max (INR)</Label>
                        <Input
                            id="budgetMax"
                            type="number"
                            value={buyer.budgetMax || ""}
                            onChange={(e) => handleChange("budgetMax", Number(e.target.value))}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="timeline">Timeline</Label>
                    <select
                        id="timeline"
                        value={buyer.timeline}
                        onChange={(e) => handleChange("timeline", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option>0-3m</option>
                        <option>3-6m</option>
                        <option>&gt;6m</option>
                        <option>Exploring</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="source">Source</Label>
                    <select
                        id="source"
                        value={buyer.source}
                        onChange={(e) => handleChange("source", e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1))}
                        className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option>Website</option>
                        <option>Referral</option>
                        <option>Walk-in</option>
                        <option>Call</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                        id="status"
                        value={buyer.status}
                        onChange={(e) => handleChange("status", e.target.value.toLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1))}
                        className="w-full px-3 py-2 rounded-md border dark:bg-gray-700 dark:text-gray-100"
                    >
                        <option>New</option>
                        <option>Qualified</option>
                        <option>Contacted</option>
                        <option>Visited</option>
                        <option>Negotiation</option>
                        <option>Converted</option>
                        <option>Dropped</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                        className="w-full p-2 rounded border bg-transparent dark:bg-gray-700 dark:text-gray-100"
                        id="notes"
                        value={buyer.notes || ""}
                        onChange={(e) => handleChange("notes", e.target.value)}
                        rows={4}
                    />
                </div>

                <Button type="submit" className="w-full mt-6">
                    Update Buyer
                </Button>
            </form>
        </div>
    );
}