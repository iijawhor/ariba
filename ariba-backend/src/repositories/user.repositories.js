import { User } from "../models/user.model.js";

export const signup = (data) => User.create(data);
export const createUser = (data) => User.create(data);
export const findUserByEmail = (email) => User.findOne({ email });
export const findUserById = (userId) => {
  return User.findById(userId);
};
