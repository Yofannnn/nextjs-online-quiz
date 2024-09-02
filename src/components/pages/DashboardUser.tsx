"use client";

import { UserType } from "@/types/user.type";
import { Button } from "../ui/button";
import { logout } from "@/lib/auth";

export default function UserDashboardPage({ user }: { user: UserType }) {
  async function handleLogout() {
    await logout();
  }

  return (
    <>
      <div>
        <div className="mx-auto flex justify-center items-center gap-4">
          <h1 className="text-center text-2xl my-5">User Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div className="mx-4 md:mx-auto max-w-3xl rounded-3xl p-4 bg-muted">
          <h5>name: {user.name}</h5>
          <h5>email: {user.email}</h5>
          <div className="w-full flex justify-start gap-6">
            <h5>scores: </h5>
            <ul className="list-disc list-outside">
              {user.scores && user.scores?.length > 0
                ? user.scores?.map((score, i) => (
                    <li key={i}>
                      <h5>quiz: {score.quizId}</h5>
                      <h5>score: {score.score}</h5>
                    </li>
                  ))
                : "-"}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
