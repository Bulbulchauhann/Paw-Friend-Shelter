"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button/button";

const HeroSectionFirstCTAGroup = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
      <Button asChild>
        <Link href="/adoption">Adoption</Link>
      </Button>
    </div>
  );
};

export default HeroSectionFirstCTAGroup;
