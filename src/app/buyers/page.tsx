"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { debounce } from "lodash";

export default function BuyersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [buyers, setBuyers] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  // URL-synced state
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || ""
  );
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [timeline, setTimeline] = useState(searchParams.get("timeline") || "");
  const page = parseInt(searchParams.get("page") || "1");

  // 🔍 Debounced search
  const debouncedSearch = debounce((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("search", value);
    else params.delete("search");
    params.set("page", "1");
    router.push(`/buyers?${params.toString()}`);
  }, 500);

  // Update filters in URL
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`/buyers?${params.toString()}`);
  };

  // Fetch buyers
  useEffect(() => {
    async function fetchBuyers() {
      setLoading(true);
      const res = await fetch(`/api/buyers/import?${searchParams.toString()}`);
      const data = await res.json();
      setBuyers(data.data || []);
      setPagination(data.pagination || { page: 1, totalPages: 1 });
      setLoading(false);
    }
    fetchBuyers();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Headline */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Buyers
        </h1>

        {/* Search + Filters */}
        <Card className="p-4 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by name, phone, or email..."
            defaultValue={search}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="md:w-1/3"
          />

          <Select value={city} onValueChange={(val) => updateFilter("city", val)}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Chandigarh">Chandigarh</SelectItem>
              <SelectItem value="Mohali">Mohali</SelectItem>
              <SelectItem value="Zirakpur">Zirakpur</SelectItem>
              <SelectItem value="Panchkula">Panchkula</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={propertyType}
            onValueChange={(val) => updateFilter("propertyType", val)}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Plot">Plot</SelectItem>
              <SelectItem value="Office">Office</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={status}
            onValueChange={(val) => updateFilter("status", val)}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Visited">Visited</SelectItem>
              <SelectItem value="Negotiation">Negotiation</SelectItem>
              <SelectItem value="Converted">Converted</SelectItem>
              <SelectItem value="Dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={timeline}
            onValueChange={(val) => updateFilter("timeline", val)}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-3m">0-3m</SelectItem>
              <SelectItem value="3-6m">3-6m</SelectItem>
              <SelectItem value=">6m">{">6m"}</SelectItem>
              <SelectItem value="Exploring">Exploring</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Table */}
        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : buyers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No buyers found.
                  </TableCell>
                </TableRow>
              ) : (
                buyers.map((buyer) => (
                  <TableRow key={buyer.id}>
                    <TableCell>{buyer.fullName}</TableCell>
                    <TableCell>{buyer.phone}</TableCell>
                    <TableCell>{buyer.city}</TableCell>
                    <TableCell>{buyer.propertyType}</TableCell>
                    <TableCell>
                      {buyer.budgetMin || "-"} – {buyer.budgetMax || "-"}
                    </TableCell>
                    <TableCell>{buyer.timeline}</TableCell>
                    <TableCell>{buyer.status}</TableCell>
                    <TableCell>
                      {new Date(buyer.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/buyers/${buyer.id}`)}
                      >
                        View / Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-4">
          <Button
            variant="outline"
            disabled={pagination.page <= 1}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(pagination.page - 1));
              router.push(`/buyers?${params.toString()}`);
            }}
          >
            Previous
          </Button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(pagination.page + 1));
              router.push(`/buyers?${params.toString()}`);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
