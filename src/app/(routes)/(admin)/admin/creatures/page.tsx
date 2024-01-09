import { Metadata } from "next";
import CreatureClient from "./_components/client";
import prisma from "@/lib/prisma";
import { CreatureColumn } from "./_components/columns";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Creatures",
};

const Creatures = async () => {
  const creatures = await prisma.creature.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCreatures: CreatureColumn[] = creatures.map((item) => {
    return {
      id: item.id,
      name: item.name,
      category: item.category.name,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
      imageUrl: item.imageUrl,
    };
  });

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CreatureClient data={formattedCreatures} />
      </div>
    </div>
  );
};

export default Creatures;
