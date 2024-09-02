import RegisterPage from "@/components/pages/Register";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getSession();
  return session?.valid ? redirect("/") : <RegisterPage />;
}
