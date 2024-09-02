import PlayQuizPage from "@/components/pages/PlayQuiz";
import { getSession } from "@/lib/auth";
import { QuizType } from "@/types/quiz.type";
import { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

async function getQuiz(id: string) {
  try {
    const quiz = await fetch(
      `${process.env.BASE_URL}/api/quiz/question?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!quiz.ok) throw new Error(quiz.statusText);
    return await quiz.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export default async function PlayQuiz({
  params,
}: {
  params: { slug: string[] };
}) {
  const session = await getSession();
  if (!session?.valid) return redirect("/login");
  const decoded = session.decode as JwtPayload;
  const userId: string = decoded.userId;

  const [quizId, index] = params.slug;
  const quiz: QuizType = await getQuiz(quizId);
  if (!quiz) return;
  return <PlayQuizPage quiz={quiz} index={Number(index)} userId={userId} />;
}
