"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import Heading from "../../_components/ui/heading/heading";
import { Button } from "@/components/ui/button/button";
import { Separator } from "@/components/ui/separator/separator";
import { CreatureColumn, columns } from "./columns";
import { DataTable } from "../../_components/ui/data-table/data-table";

type CreatureClientProps = {
  data: CreatureColumn[];
};

const CreatureClient = ({ data }: CreatureClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Creatures (${data.length})`}
          description="Manage creatures"
        />

        <Button onClick={() => router.push(`/admin/creatures/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          <span>Add New</span>
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};

export default CreatureClient;
