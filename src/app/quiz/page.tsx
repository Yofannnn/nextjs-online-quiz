import { QuizType } from "@/types/quiz.type";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getQuizs() {
  try {
    const quizs = await fetch(`${process.env.BASE_URL}/api/quiz/question`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });
    if (!quizs.ok) throw new Error(quizs.statusText);
    return await quizs.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export default async function QuizPage() {
  const quizs: QuizType[] = await getQuizs();
  if (!quizs) return <h1>Error</h1>;

  return (
    <>
      <h1 className="text-2xl text-center my-6">Quiz Page</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
        {quizs?.map((quiz) => (
          <Card key={quiz.quizId}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>
                Genre: <span className="font-bold">{quiz.genreOfQuiz}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 md:flex-row justify-between">
              <p>{quiz.questions.length} Questions</p>
              <Button asChild>
                <Link href={`quiz/${quiz.quizId}/0`}>Play now</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
