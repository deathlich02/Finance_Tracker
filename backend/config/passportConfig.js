import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from "bcrypt"
import prisma from "../prisma/db.js"

const JWT_SECRET = "yuh" 

function passportInit(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } })
      if (!user) return done(null, false, { message: "Invalid username" })
  
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) return done(null, false, { message: "Invalid password" })
  
      return done(null, user)
    } catch (err) {
      console.error("Error in authenticateUser:", err)
      return done(err)
    }
  }
  

  passport.use(
    new LocalStrategy(
      { usernameField: "username" }, 
      authenticateUser
    )
  )

  //token part 

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await prisma.user.findUnique({ where: { id: payload.id } })
          if (!user) return done(null, false)
          return done(null, user)
        } catch (err) {
          return done(err, false)
        }
      }
    )
  )
}

export default passportInit
