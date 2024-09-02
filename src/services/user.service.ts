import UserModel from "@/models/user.model";
import { UserType } from "@/types/user.type";

export const createUser = async (payload: UserType) => {
  return await UserModel.create(payload);
};

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const findUserByID = async (userID: string) => {
  return await UserModel.findById(userID);
};

export const saveUserScore = async (userId: string, payload: UserType) => {
  return await UserModel.findByIdAndUpdate(
    { _id: userId },
    { $set: payload },
    { new: true }
  );
};
