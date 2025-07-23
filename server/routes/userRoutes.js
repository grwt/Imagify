import {registerUser,loginUser, userCredits} from '../controller/userController.js';
import express from 'express';
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();
userRouter.use(express.json());


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits',userAuth, userCredits);

export default userRouter;
