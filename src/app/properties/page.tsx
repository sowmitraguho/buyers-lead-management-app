"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type Property = {
  id: string;
  seller_id: string;
  title: string;
  price: number;
  city: string;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  status: string;
  created_at: string;
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("properties").select("*");
      if (error) {
        console.error("Error fetching properties:", error);
      } else {
        setProperties(data as Property[]);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [supabase]);

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    {/* <TableHead>Seller ID</TableHead> */}
                    <TableHead>Price</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Beds</TableHead>
                    <TableHead>Baths</TableHead>
                    <TableHead>Area (sqft)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>{property.title}</TableCell>
                      {/* <TableCell className="text-xs">
                        {property.seller_id}
                      </TableCell> */}
                      <TableCell>${property.price.toLocaleString()}</TableCell>
                      <TableCell>{property.city}</TableCell>
                      <TableCell>{property.property_type}</TableCell>
                      <TableCell>
                        {property.bedrooms ?? "-"}
                      </TableCell>
                      <TableCell>
                        {property.bathrooms ?? "-"}
                      </TableCell>
                      <TableCell>
                        {property.area_sqft ?? "-"}
                      </TableCell>
                      <TableCell>{property.status}</TableCell>
                      <TableCell>
                        {new Date(property.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}