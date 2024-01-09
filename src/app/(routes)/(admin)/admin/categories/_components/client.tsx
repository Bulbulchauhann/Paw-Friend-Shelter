"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import Heading from "../../_components/ui/heading/heading";
import { CategoryColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator/separator";
import { DataTable } from "../../_components/ui/data-table/data-table";

type CategoryClientProps = {
  data: CategoryColumn[];
};

const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories of creatures"
        />

        <Button onClick={() => router.push(`/admin/categories/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          <span>Add New</span>
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};

export default CategoryClient;
