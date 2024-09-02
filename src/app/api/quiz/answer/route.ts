import connectToDatabase from "@/lib/mongoose";
import { createAnswerQuiz } from "@/services/answer.service";
import { AnswerType } from "@/types/quiz.type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const body: AnswerType = await request.json();

  try {
    const answer = await createAnswerQuiz(body);
    if (!answer) throw new Error("Failed to create Answer to Database");

    return NextResponse.json({
      status: 201,
      statusText: "Correct Answer created successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 422, statusText: error.message }
    );
  }
}
