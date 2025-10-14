import exrpess from "express";
import {
  createUserController,
  getUserController,
  loginUserController,
  getAllUsersController,
} from "../controllers/userController.js";

const userRouter = exrpess.Router();

userRouter.post("/api/users", createUserController);
userRouter.get("/api/users/:id", getUserController);
userRouter.post("/api/users/login", loginUserController);
userRouter.get("/api/users", getAllUsersController);

export default userRouter;
