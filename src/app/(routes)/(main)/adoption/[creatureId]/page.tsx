import { lora } from "@/app/layout";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AdoptForm from "./_components/adopt-form";

type SingleCreaturePageProps = {
  params: {
    creatureId: string;
  };
};

const SingleCreaturePage = async ({ params }: SingleCreaturePageProps) => {
  const singleCreature = await prisma.creature.findFirst({
    where: {
      id: params.creatureId,
    },
  });

  return (
    <div className="relative h-full">
      <div className="bg-[#f9f9fb] px-5 lg:px-[120px] h-full">
        <div className="py-10 flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <h1
              className={cn(lora.className, "text-center text-4xl font-medium")}
            >
              Animal Adoption
            </h1>
            <p className="text-center">
              Please fill out the adoption form to adopt a new animal.
            </p>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row mx-auto">
            <div className="">
              <div className="flex flex-col flex-wrap gap-3 w-72">
                <div className="border rounded-md p-4 bg-white space-y-2">
                  <div className="relative h-[200px]">
                    <Image
                      src={singleCreature?.imageUrl as string}
                      alt=""
                      fill
                      className="object-cover h-full rounded-md"
                    />
                  </div>

                  <p className="text-base font-semibold text-center">
                    {singleCreature?.name}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <AdoptForm creatureId={params.creatureId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCreaturePage;
