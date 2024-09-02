import connectToDatabase from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import {
  createQuestionQuiz,
  getAllQuestionsQuiz,
  getQuestionQuizById,
} from "@/services/question.service";
import { QuizType } from "@/types/quiz.type";

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const body: QuizType = await request.json();

  try {
    const question = await createQuestionQuiz(body);
    if (!question) throw new Error("Failed to create Quiz");

    return NextResponse.json({
      status: 201,
      statusText: "Quiz created successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 422, statusText: error.message }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await connectToDatabase();

  try {
    if (id) {
      const question = await getQuestionQuizById(id);
      if (!question) {
        return NextResponse.json(
          { error: "Not found !!" },
          { status: 404, statusText: `${id} is not found` }
        );
      }
      return NextResponse.json(question, {
        status: 200,
        statusText: "Success",
      });
    }
    const questions = await getAllQuestionsQuiz();
    if (!questions) throw new Error("Failed to get all question");
    return NextResponse.json(questions, {
      status: 200,
      statusText: "Success",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 422, statusText: error.message }
    );
  }
}
