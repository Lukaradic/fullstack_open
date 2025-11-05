import exrpess from "express";
import {
  createUserController,
  loginUserController,
  getAllUsersController,
  testUsersController,
} from "../controllers/userController.js";

const userRouter = exrpess.Router();

userRouter.post("/api/users", createUserController);
userRouter.post("/api/users/login", loginUserController);
userRouter.get("/api/users", getAllUsersController);

if (process.env.NODE_ENV === "test") {
  userRouter.post("/api/testing/reset", testUsersController);
}

export default userRouter;
