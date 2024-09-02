import { Schema, model, models } from "mongoose";

const AnswerSchema = new Schema({
  quizId: {
    type: String,
    unique: true,
    required: true,
  },
  answerOfQuestions: [
    {
      questionId: {
        type: String,
        required: true,
      },
      correctAnswer: {
        type: String,
        required: true,
      },
    },
  ],
});

const AnswerModel = models.Answer || model("Answer", AnswerSchema);

export default AnswerModel;
