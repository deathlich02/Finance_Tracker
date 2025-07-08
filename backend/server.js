import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authRouter.js'
import apiRouter from './routes/apiRouter.js'
import passport from 'passport'
import passportInit from './config/passportConfig.js'


dotenv.config()
const app = express()
passportInit(passport)
app.use(express.json())
app.use(passport.initialize())

//routes go here

// /auth will handle login and register
app.use('/auth', authRouter)
app.use('/api', apiRouter)

app.listen(process.env.PORT, ()=> {
    console.log("Server is listening")
})