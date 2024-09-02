export interface AnswerOption {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface QuestionType {
  questionId: string;
  questionText: string;
  answerOptions: AnswerOption;
}

export interface TemporaryQuestionInLocalStorageType {
  questionId: string;
  questionText: string;
  answerOptions: AnswerOption;
  correctAnswer: string;
}

export interface QuizType {
  quizId: string;
  title: string;
  genreOfQuiz: string;
  questions: QuestionType[];
}

export interface AnswerType {
  quizId: string;
  answerOfQuestions: {
    questionId: string;
    correctAnswer: string;
  }[];
}

export interface UserAnswer {
  questionId: string;
  userAnswer: string;
}
