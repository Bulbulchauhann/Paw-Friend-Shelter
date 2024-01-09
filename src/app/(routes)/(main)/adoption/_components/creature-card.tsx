"use client";

import { Button } from "@/components/ui/button/button";
import { Creature } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type CreatureCardProps = {
  data: Creature;
};

const CreatureCard = ({ data }: CreatureCardProps) => {
  return (
    <div className="flex flex-col flex-wrap gap-3 w-72">
      <div className="border rounded-md p-4 bg-white space-y-2">
        <div className="relative h-[200px]">
          <Image
            src={data?.imageUrl}
            alt=""
            fill
            className="object-cover h-full rounded-md"
          />
        </div>

        <p className="text-base font-semibold text-center">{data?.name}</p>
      </div>

      <Button size="sm">
        <Link href={`/adoption/${data?.id}`}>Adopt</Link>
      </Button>
    </div>
  );
};

export default CreatureCard;
