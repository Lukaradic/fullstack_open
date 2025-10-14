import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isNil from "lodash/isNil.js";

import {
  createUser,
  getAllUsers,
  getUserByUsername,
} from "../services/userService.js";

export const createUserController = async (req, res, next) => {
  try {
    const { username, password, name } = req?.body || {};

    if (!username || !password || !name) {
      res.status(400).json({ message: "Bad request, missing key fields" });
    }

    const user = await getUserByUsername(username);
    if (!isNil(user)) {
      res.status(400).json({
        message: `Error creating user, username: ${username}, already taken`,
      });
    }
    const createUserResult = await createUser({ username, password, name });

    const userData = {
      username: createUserResult.name,
      id: createUserResult.id,
    };
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    res.status(201).json({ data: createUserResult, token });
  } catch (error) {
    const { name, message } = error;
    if (name === "ValidationError") {
      return res.status(400).json({ message, success: false });
    }
    res.status(400).json({ success: false, message });
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const { username, password } = req?.body || {};

    if (!username || !password) {
      res.status(400).json({ message: "Missing username or password" });
    }
    const user = await getUserByUsername(username);
    if (isNil(user)) {
      res.status(401).json({ message: "User doesn't exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user?.passwordHash);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
    }

    const userData = {
      username: user.name,
      id: user.id,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET);
    res.status(200).json({ success: true, data: userData, token });
  } catch (error) {
    res.status(500).end();
  }
};
