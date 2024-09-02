import { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema(
  {
    quizId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    genreOfQuiz: {
      type: String,
      required: true,
    },
    questions: [
      {
        questionId: {
          type: String,
          unique: true,
          required: true,
        },
        questionText: {
          type: String,
          required: true,
        },
        answerOptions: {
          A: { type: String, required: true },
          B: { type: String, required: true },
          C: { type: String, required: true },
          D: { type: String, required: true },
        },
      },
    ],
  },
  { timestamps: true }
);

const QuestionModel = models.Question || model("Question", QuestionSchema);

export default QuestionModel;
