import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    scores: {
      type: [
        {
          quizId: {
            type: String,
            unique: true,
            required: true,
          },
          score: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
