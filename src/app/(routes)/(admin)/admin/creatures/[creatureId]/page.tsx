import prisma from "@/lib/prisma";
import CreatureForm from "./_components/creature-form";

type GenerateMetaDataProps = {
  params: {
    creatureId: string;
  };
};

export async function generateMetadata({ params }: GenerateMetaDataProps) {
  const { creatureId } = params;

  return {
    title: creatureId === "new" ? "New Creature" : "Edit Creature",
  };
}

const CreaturePage = async ({ params }: { params: { creatureId: string } }) => {
  let creature =
    params.creatureId === "new"
      ? null
      : await prisma.creature.findUnique({
          where: {
            id: params.creatureId,
          },
        });

  const categories = await prisma.category.findMany();

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CreatureForm initialData={creature} categories={categories} />
      </div>
    </div>
  );
};

export default CreaturePage;
