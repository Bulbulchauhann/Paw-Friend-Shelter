import { userAuth } from "@/lib/user-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userAuth();

  if (user) {
    return redirect("/admin");
  }

  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
}
