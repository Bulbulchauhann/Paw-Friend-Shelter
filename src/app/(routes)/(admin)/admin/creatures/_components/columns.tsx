"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CreatureColumn = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
};

export const columns: ColumnDef<CreatureColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center gap-x-2">
          <div className="relative w-12 h-12 overflow-hidden rounded">
            <Image
              fill
              alt="Featured Image"
              src={row.original.imageUrl}
              className="object-cover"
            />
          </div>
          <span className="truncate max-w-[280px]">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
