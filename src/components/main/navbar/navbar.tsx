import Link from "next/link";

import { lora } from "@/app/layout";
import { cn } from "@/lib/utils";

import { NavMenu } from "./nav-menu";

const Navbar = () => {
  return (
    <header className="relative border-b bg-white h-16 px-5 lg:px-[120px]">
      <div className="h-full flex flex-row items-center justify-between">
        <Link href="/" className="relative">
          <h1 className={cn(lora.className, "text-3xl font-semibold")}>
            PF Shelter
          </h1>
        </Link>

        <NavMenu />
      </div>
    </header>
  );
};

export { Navbar };
