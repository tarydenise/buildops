import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import type { Profile } from 'passport';
import UserModel from '../models/User';

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: '/auth/google/callback',
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: (error: any, user?: Express.User | false | null) => void
        ) => {
            try {
                const existingUser = await UserModel.findOne({ googleId: profile.id });

                if (existingUser) return done(null, existingUser);

                const newUser = new UserModel({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails?.[0].value,
                    avatar: profile.photos?.[0].value,
                });

                await newUser.save();
                return done(null, newUser);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// serialize/deserialize user for session support
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});