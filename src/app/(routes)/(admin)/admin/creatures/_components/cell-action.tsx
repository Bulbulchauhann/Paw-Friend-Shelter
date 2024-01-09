"use client";

import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/dropdown-menu";
import { Button } from "@/components/ui/button/button";

import { CreatureColumn } from "./columns";
import { AlertModal } from "../../_components/ui/alert-modal/alert-modal";

interface CellActionProps {
  data: CreatureColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Creature Id copied!");
  };

  const onDelete = async () => {
    const loadingToast = toast.loading("Processing...");

    try {
      setLoading(true);

      await axios.delete(`/api/creatures/${data.id}`);

      router.refresh();
      toast.success("Creature deleted!");
    } catch (error) {
      console.log("", error);
      toast.error("Something went wrong while deleting creature.");
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex items-center gap-3 cursor-pointer"
            onClick={() =>
              router.push(`/admin/creatures/${data.id}`)
            }
          >
            <Edit className="w-4 h-4" />
            <span>Update</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onCopy(data.id)}
          >
            <Copy className="w-4 h-4" />
            <span>Copy Id</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4 text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
