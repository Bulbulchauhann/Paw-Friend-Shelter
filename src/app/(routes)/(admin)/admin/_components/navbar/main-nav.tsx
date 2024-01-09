"use client";

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: `/admin`,
      label: "Overview",
      active: pathname === `/admin`,
    },
    {
      href: `/admin/categories`,
      label: "Categories",
      active: pathname === `/admin/categories`,
    },
    {
      href: `/admin/creatures`,
      label: "Creatures",
      active: pathname === `/admin/creatures`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}>
      {routes.map((route) => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative",
              route.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
