import { redirect } from "next/navigation";

import LoginForm from "./_components/LoginForm";
import { userAuth } from "@/lib/user-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Admin",
};

const Login = async () => {
  const user = await userAuth();

  if (user) {
    return redirect("/admin");
  }

  return (
    <div className="border max-w-xl w-[95%] md:w-4/5 mx-auto px-8 py-10 rounded-lg shadow-sm">
      <LoginForm />
    </div>
  );
};

export default Login;
