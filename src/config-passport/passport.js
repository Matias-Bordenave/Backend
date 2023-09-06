const passport = require("passport")
/* const LocalStrategy = require("passport-local") */

/* JWT */

const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt

const userModel = require("../../dao/models/users.model")
const { createHash, isValidPassword } = require("../../utils/bcrypt")

const initializePassport = () => {
    /*     passport.use("register", new LocalStrategy(
            {
                passReqToCallback: true, usernameField: "email"
            },
            async (req, username, password, done) => {
    
                try {
                    let dataUser = req.body
    
                    let user = await userModel.findOne({ email: dataUser.email })
    
                    if (user) {
                        console.log("user already exists")
                        return done(null, false)
                    }
    
                    let newUser = {
                        name: dataUser.name,
                        password: createHash(dataUser.password),
                        email: dataUser.email,
                        age: dataUser.age,
                        rol: "user"
                    }
    
                    let result = await userModel.create(newUser)
    
                    return done(null, result)
    
                } catch (err) {
                    return done(null, false)
                }
            },
    
            passport.serializeUser(async (user, done) => {
                await userModel.findOne({ email: user.email }).then((res) => {
                    done(null, res._id)
                }).catch((err) => {
                    console.log(err)
                })
            }),
    
            passport.deserializeUser(async (id, done) => {
                let us = await userModel.findOne({ _id: id })
                done(null, us)
            })
        ))
    
        passport.use("login", new LocalStrategy(
            {
                passReqToCallback: true, usernameField: "email"
            },
            async (req, username, password, done) => {
    
                try {
    
                    let user = await userModel.findOne({ email: username })
    
                    if (!user) {
                        console.log("user doesn't exists")
                        return done(null, false)
                    }
    
                    if (!isValidPassword(user, password)) {
                        return done(null, false)
                    }
    
                    return done(null, user)
    
                } catch (err) {
                    return done(null, false)
                }
            },
    
            passport.serializeUser(async (user, done) => {
                await userModel.findOne({ email: user.email }).then((res) => {
                    done(null, res._id)
                }).catch((err) => {
                    console.log(err)
                })
            }),
    
            passport.deserializeUser(async (id, done) => {
                let us = await userModel.findOne({ _id: id })
                done(null, us)
            })
        )) */

    /*  */
    /*  */
    /*  JWT */

    passport.use("jwt", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "mysecretcoderjwt"
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (err) {
            console.log("err")
            return done(null, false)
        }
    }))
}

const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['jwtCookie']
    }

    return token
}

module.exports = { initializePassport }