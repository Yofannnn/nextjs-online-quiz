import AnswerModel from "@/models/answer.model";
import { AnswerType } from "@/types/quiz.type";

export const createAnswerQuiz = async (payload: AnswerType) => {
  return await AnswerModel.create(payload);
};

export const getAnswerQuizById = async (quizId: string) => {
  return await AnswerModel.findOne({ quizId });
};
