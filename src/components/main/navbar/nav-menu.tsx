"use client";

import { Lora } from "next/font/google";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet/sheet";
// import { lora } from "@/app/layout";
import { cn } from "@/lib/utils";

const lora = Lora({ subsets: ["latin"], display: "swap" });

const menuItems = [
  {
    id: "home",
    label: "Home",
    slug: "/",
  },
  {
    id: "adoption",
    label: "Adoption",
    slug: "/adoption",
  },
];

const NavMenu = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex-1">
      {/* Desktop Navmenu */}
      <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 flex items-center justify-center gap-5">
          {menuItems.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.slug}
                className="font-medium transition hover:text-primary"
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Button variant="default" asChild>
          <Link href="/adoption">Adoption</Link>
        </Button>
      </div>

      {/* Mobile Navmenu */}
      <div className="flex lg:hidden ml-auto">
        <Sheet>
          <SheetTrigger className="ml-auto">
            <Button variant="ghost" className="hover:bg-transparent">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-60" side="left">
            <SheetHeader>
              <SheetTitle className={cn(lora.className, "text-3xl")}>
                PF Sheltor
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col items-center gap-4 my-4">
              {menuItems?.map((item) => {
                return (
                  <Link
                    href={item.slug}
                    key={item.id}
                    className="text-3xl font-medium hover:text-primary transition"
                  >
                    {item?.label}
                  </Link>
                );
              })}

              <Button variant="default" asChild>
                <Link href="/adoption">Adoption</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export { NavMenu };
