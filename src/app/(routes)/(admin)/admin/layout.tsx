import { redirect } from "next/navigation";

import { userAuth } from "@/lib/user-auth";
import Navbar from "./_components/navbar/navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userAuth();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
}
