import { getAnswerQuizById } from "@/services/answer.service";
import { findUserByID, saveUserScore } from "@/services/user.service";
import { AnswerType, UserAnswer } from "@/types/quiz.type";
import { UserType } from "@/types/user.type";
import { UserAnswerSchema } from "@/validation/quiz.validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, quizId, userAnswers } = await request.json();

  const validateUserAnswer = UserAnswerSchema.safeParse(userAnswers);

  if (!validateUserAnswer.success) {
    return NextResponse.json(
      { error: "Invalid answers" },
      {
        status: 422,
        statusText: "Invalid user answers",
      }
    );
  }

  const validatedAnswer = validateUserAnswer.data;

  try {
    const answersFromDb: AnswerType = await getAnswerQuizById(quizId);
    if (!answersFromDb) throw new Error("Not Found!");

    const scoreUser = calculateScore(answersFromDb, validatedAnswer);

    const user: UserType = await findUserByID(userId);
    if (!user) throw new Error("User not found");

    if (!user.scores) user.scores = [];

    const index = user.scores.findIndex((score) => score.quizId === quizId);
    if (index !== -1) {
      user.scores[index].score = scoreUser;
    } else {
      user.scores.push({ quizId, score: scoreUser });
    }

    const saveAndUpdateUserScore = await saveUserScore(userId, user);
    if (!saveAndUpdateUserScore) throw new Error("Failed to save Score");

    return NextResponse.json(scoreUser, {
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

function calculateScore(
  correctAnswers: AnswerType,
  userAnswers: UserAnswer[]
): number {
  return correctAnswers.answerOfQuestions
    .map(
      (correctAnswer) =>
        userAnswers.find(
          (userAnswer) => userAnswer.questionId === correctAnswer.questionId
        )?.userAnswer === correctAnswer.correctAnswer
    )
    .filter(Boolean).length;
}
