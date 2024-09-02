"use server";

import AdminDashboardPage from "@/components/pages/DashboardAdmin";
import UserDashboardPage from "@/components/pages/DashboardUser";
import { getSession } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

async function fetchUser(userId: string) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/auth/user?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export default async function Dashboard() {
  const session = await getSession();

  if (!session?.valid) return redirect("/login");

  const decoded = session.decode as JwtPayload;

  const user = await fetchUser(decoded.userId);

  if (!user || user.error) return redirect("/login");

  return user.role === "admin" ? <AdminDashboardPage /> : <UserDashboardPage user={user}/>;
}
