import { Router } from "express";
import { getLogin, getRegister, postLogin, postRegister } from "../controllers/authController.js";

const authRouter  = Router()


authRouter.get('/login', getLogin)

authRouter.get('/register', getRegister)

authRouter.post('/login', postLogin)

authRouter.post('/register',postRegister)

export default authRouter