import LoginPage from "@/components/pages/Login";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getSession();
  return session?.valid ? redirect("/") : <LoginPage />;
}
