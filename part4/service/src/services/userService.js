import bcrypt from "bcrypt";
import isNil from "lodash/isNil.js";
import { User } from "../models/userModel.js";

export const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  if (isNil(user)) {
    return null;
  }
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find({}).populate("blogs");
  return users;
};

export const createUser = async ({ username, name, password }) => {
  const saltRounds = 8;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    passwordHash,
    username,
    name,
  });

  return await user.save();
};
