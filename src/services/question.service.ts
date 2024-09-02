import QuestionModel from "@/models/question.model";
import { QuizType } from "@/types/quiz.type";

export const createQuestionQuiz = async (payload: QuizType) => {
  return await QuestionModel.create(payload);
};

export const getQuestionQuizById = async (quizId: string) => {
  return await QuestionModel.findOne({ quizId });
};

export const getAllQuestionsQuiz = async () => {
  return await QuestionModel.find();
};
