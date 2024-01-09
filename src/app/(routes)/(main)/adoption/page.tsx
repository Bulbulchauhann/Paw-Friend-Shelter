import prisma from "@/lib/prisma";
import CategoryCardForMain from "./_components/category-card";
import CreatureCard from "./_components/creature-card";

type AdoptionProps = {
  searchParams: {
    categoryId: string;
  };
};

const getAllCategories = async () => {
  const response = await prisma.category.findMany();
  return response;
};

const getAllCreatures = async (categoryId: string) => {
  const response = await prisma.creature.findMany({
    where: {
      categoryId: categoryId,
    },
  });

  return response;
};

const Adoption = async ({ searchParams }: AdoptionProps) => {
  const categories = await getAllCategories();

  const catId = searchParams?.categoryId ?? categories?.[0]?.id;

  const creatures = await getAllCreatures(catId);

  console.log(creatures);

  return (
    <main className="relative h-full">
      <div className="bg-[#f9f9fb] px-5 lg:px-[120px] h-full">
        <div className="py-10 flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-7 justify-center content-center">
            {categories?.map((category) => {
              return (
                <CategoryCardForMain
                  key={category.id}
                  data={category}
                  active={catId === category.id}
                />
              );
            })}
          </div>

          <div>
            {creatures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                {creatures?.map((creature) => {
                  return <CreatureCard data={creature} key={creature.id} />;
                })}
              </div>
            ) : (
              <div className="text-lg text-center">No Creatures found.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Adoption;
