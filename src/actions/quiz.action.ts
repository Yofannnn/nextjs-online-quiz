"use server";

import { v4 as uuidv4 } from "uuid";
import { ActionResult } from "@/types/action-result";
import { formatError } from "@/lib/format-error";
import {
  TemporaryQuestionInLocalStorageType,
  UserAnswer,
} from "@/types/quiz.type";
import {
  CreateQuizSchema,
  UserAnswerSchema,
} from "@/validation/quiz.validation";

export async function saveQuestionQuizToDatabaseAction(
  questionsFormLocal: TemporaryQuestionInLocalStorageType[],
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const rawQuiz = {
    ...Object.fromEntries(formData.entries()),
    questions: questionsFormLocal,
  };

  const validate = await CreateQuizSchema.safeParseAsync(rawQuiz);
  if (!validate.success) {
    return {
      errors: formatError(validate.error),
    };
  }

  const quizId = `q-${uuidv4()}`;

  const createQuiz = {
    quizId,
    title: validate.data.title,
    genreOfQuiz: validate.data.genreOfQuiz,
    questions: validate.data.questions.map((question) => {
      return {
        questionId: question.questionId,
        questionText: question.questionText,
        answerOptions: question.answerOptions,
      };
    }),
  };

  const keyAnswer = {
    quizId,
    answerOfQuestions: validate.data.questions.map((question) => {
      return {
        questionId: question.questionId,
        correctAnswer: question.correctAnswer,
      };
    }),
  };

  const fetchQuestion = () => {
    return fetch(`${process.env.BASE_URL}/api/quiz/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createQuiz),
    });
  };

  const fetchAnswer = () => {
    return fetch(`${process.env.BASE_URL}/api/quiz/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyAnswer),
    });
  };

  try {
    const responses = await Promise.all([fetchQuestion(), fetchAnswer()]);
    const [responseQuestion, responseAnswer] = responses;
    if (!responseQuestion.ok)
      throw new Error("error occur when creating question");
    if (!responseAnswer.ok) throw new Error("error occur when creating answer");
    return { success: true };
  } catch (error: any) {
    return { success: false, errors: formatError(error.message) };
  }
}

export async function submitUserAnswerAndGetScore(
  userId: string,
  quizId: string,
  userAnswerFromLocal: UserAnswer[]
) {
  const validate = await UserAnswerSchema.safeParseAsync(userAnswerFromLocal);

  if (!validate.success) {
    return {
      errors: formatError(validate.error),
    };
  }

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/quiz/correction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, quizId, userAnswers: validate.data }),
    });
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (error) {
    return { errors: formatError(error) };
  }
}
