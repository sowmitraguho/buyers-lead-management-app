"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

// type DeleteBuyerButtonProps = {
//   buyerId: string;
//   onDeleted?: () => void; 
// };

export default function DeleteBuyerButton({ buyerId, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this buyer?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/buyers/${buyerId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        alert("Buyer deleted successfully!");
        if (onDeleted) onDeleted(); // refresh parent if needed
      } else {
        alert(data.error || "Failed to delete buyer");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={loading}
      onClick={handleDelete}
      className="flex items-center gap-2"
    >
      <Trash2 className="w-4 h-4" />
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
}
