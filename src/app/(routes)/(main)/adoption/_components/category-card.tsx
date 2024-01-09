"use client";

import { Category } from "@prisma/client";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

type CategoryCardForMainProps = {
  data: Category;
  active: boolean;
};

const CategoryCardForMain = ({ data, active }: CategoryCardForMainProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    console.log(current);

    const query = {
      ...current,
      categoryId: id,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div
      key={data.id}
      className={cn(
        "border rounded-md px-6 py-2 cursor-pointer",
        active && "text-primary bg-white"
      )}
      onClick={() => onClick(data.id)}
    >
      {data.name}
    </div>
  );
};

export default CategoryCardForMain;
