import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authRouter.js'
import apiRouter from './routes/apiRouter.js'
import passport from 'passport'
import passportInit from './config/passportConfig.js'
import cors from 'cors'


dotenv.config()
const app = express()
passportInit(passport)
app.use(express.json())
app.use(passport.initialize())
app.use(cors({
    origin: "http://localhost:5173", // frontend at 5173
    credentials: true               // allow cookies/auth headers 
  }));

//routes go here

// /auth will handle login and register
app.use('/auth', authRouter)
app.use('/api', apiRouter)

app.listen(process.env.PORT, ()=> {
    console.log("Server is listening")
})