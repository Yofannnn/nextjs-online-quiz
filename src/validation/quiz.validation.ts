import { z } from "zod";

export const CreateQuizSchema = z.object({
  title: z.string(),
  genreOfQuiz: z
    .string()
    .min(1, { message: "Genre must be at least 1 characters long." })
    .regex(/^(?!\s*$).+/, { message: "Genre cant be only space" })
    .trim(),
  questions: z.array(
    z.object({
      questionId: z.string(),
      questionText: z
        .string()
        .min(2, { message: "Question must be at least 2 characters long." })
        .regex(/^(?!\s*$).+/, { message: "Question cant be only space" })
        .trim(),
      answerOptions: z.object({
        A: z
          .string()
          .min(1, { message: "Answer must be at least 1 characters long." })
          .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
          .trim(),
        B: z
          .string()
          .min(1, { message: "Answer must be at least 1 characters long." })
          .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
          .trim(),
        C: z
          .string()
          .min(1, { message: "Answer must be at least 1 characters long." })
          .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
          .trim(),
        D: z
          .string()
          .min(1, { message: "Answer must be at least 1 characters long." })
          .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
          .trim(),
      }),
      correctAnswer: z
        .string()
        .min(1, { message: "Answer must be at least 1 characters long." })
        .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
        .trim(),
    })
  ),
});

export const QuizSchema = z.object({
  quizId: z.string(),
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .regex(/^(?!\s*$).+/, { message: "Title cant be only space" })
    .trim(),
  genreOfQuiz: z
    .string()
    .min(1, { message: "Genre must be at least 1 characters long." })
    .regex(/^(?!\s*$).+/, { message: "Genre cant be only space" })
    .trim(),
  questions: z.array(
    z.object({
      questionId: z.string(),
      questionText: z
        .string()
        .min(2, { message: "Question must be at least 2 characters long." })
        .regex(/^(?!\s*$).+/, { message: "Question cant be only space" })
        .trim(),
      answerOptions: z.object({
        A: z
          .string()
          .min(1, { message: "Answer must be at least 1 characters long." })
          .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
          .trim(),
        B: z
          .string()
          .min(1, { message: "Answer must be at least 1 characters long." })
          .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
          .trim(),
        C: z
          .string()
          .min(1, { message: "Answer must be at least 1 characters long." })
          .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
          .trim(),
        D: z
          .string()
          .min(1, { message: "Answer must be at least 1 characters long." })
          .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
          .trim(),
      }),
    })
  ),
});

export const UserAnswerSchema = z.array(
  z.object({
    questionId: z.string(),
    userAnswer: z
      .string()
      .min(1, { message: "Answer must be at least 1 characters long." })
      .regex(/^(?!\s*$).+/, { message: "Answer cant be only space" })
      .trim(),
  })
);
