import { redirect } from "next/navigation";

import UserButton from "../user-button/UserButton";
import { userAuth } from "@/lib/user-auth";
import MainNav from "./main-nav";

const Navbar = async () => {
  const user = await userAuth();

  const userId = user?.userId;

  if (!userId) {
    return redirect("/login");
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-2xl font-bold">Superpets</h1>

        <MainNav />

        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/login" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
