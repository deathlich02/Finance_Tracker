import prisma from "../prisma/db.js";
import bcrypt from 'bcrypt'
import passport from "passport";
import jwt from "jsonwebtoken"


const JWT_SECRET= "yuh"
function getLogin (req,res) {
    res.status(200).json({message: "Login page here"})
}

function getRegister (req,res) {
    res.status(200).json({message: "Registration page here"})
}

async function postLogin (req,res, next) {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({message: "All fields are required"})
    }
    passport.authenticate("local", {session: false}, (err,user,info) => {
        if (err) return res.status(500).json({ error: "Internal server error" })
        if (!user) return res.status(401).json({ error: info.message || "Invalid credentials" })
        
            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: "7d" }
              )
          
              res.status(200).json({
                message: "Login successful",
                token,
                user: { id: user.id, username: user.username }
              })
            })(req, res, next)     
}

async function postRegister (req,res) {
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({ message: "User registered successfully", user: { id: user.id, username: user.username } })
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Username or email already exists" })
        }
        res.status(500).json({ error: "Something went wrong" })
    }

}



export {getLogin, getRegister, postLogin, postRegister}