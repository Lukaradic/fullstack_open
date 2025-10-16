import exrpess from "express";
import {
  createUserController,
  loginUserController,
  getAllUsersController,
} from "../controllers/userController.js";

const userRouter = exrpess.Router();

userRouter.post("/api/users", createUserController);
userRouter.post("/api/users/login", loginUserController);
userRouter.get("/api/users", getAllUsersController);

export default userRouter;
