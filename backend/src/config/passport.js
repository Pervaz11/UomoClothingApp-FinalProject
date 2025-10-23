import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/userModel.js";
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    SERVER_URL,
} from "./config.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: `${SERVER_URL}/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await UserModel.findOne({ googleId: profile.id });

                if (existingUser) return done(null, existingUser);

                // check if email already exists from local auth
                const emailTaken = await UserModel.findOne({
                    email: profile.emails[0].value,
                });
                if (emailTaken)
                    return done(null, false, {
                        message: "Email is already used with local auth.",
                    });

                const newUser = await UserModel.create({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.emails[0].value.split("@")[0],
                    profileImage: profile.photos?.[0]?.value,
                    googleId: profile.id,
                    provider: "google",
                    emailVerified: true,
                });

                done(null, newUser);
            } catch (err) {
                done(err, false);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
