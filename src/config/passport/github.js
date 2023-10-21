const passport = require('passport')
const { Strategy } = require('passport-github2')

const userModel = require("../../dao/models/user.model")
const { createHash, isValidPassword } = require("../../utils/bcrypt")

passport.use('auth-github', new Strategy(
    {
        clientID: 'a29673c68f289f02130e',
        clientSecret: 'e9a98560a868e6c64510ab5eb4c26c193a05f47a',
        callbackURL: "http://localhost:3000/auth/github/callback"
    }, async (accessToken, refreshToken, profile, done) => {

        let user = await userModel.findOne({ email: profile.emails[0].value })

        if (user) {
            console.log("user already exists")
            return done(null, user)
        }
        console.log(profile.displayName)
        let newUser = {
            name: profile.displayName,
            password: createHash(profile.displayName),
            email: profile.emails[0].value,
            age: 0,
            rol: "user"
        }
        console.log(newUser)
        let result = await userModel.create(newUser)

        let newus = await userModel.findOne({ email: profile.emails[0].value })

        return done(null, newus)
    }
))