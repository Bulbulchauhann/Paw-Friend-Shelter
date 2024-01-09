import { Metadata } from "next";
import { format } from "date-fns";

import CategoryClient from "./_components/client";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Categories",
};

const Categories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = categories.map((item) => {
    return {
      id: item.id,
      name: item.name,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
