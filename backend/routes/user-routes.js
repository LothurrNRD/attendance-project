import express from 'express';
import { createUser, getAllUser, login } from '../controllers/user-controller.js';
const userRouter = express.Router();
userRouter.get("/", getAllUser);
userRouter.post("/signup", createUser);
userRouter.post("/login", login);
export default userRouter;