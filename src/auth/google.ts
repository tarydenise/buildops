import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { profile } from 'console';

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
            profile: any,
            done: (error: any, user?: any) => void
        ) => {
            try {
                const user = {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails?.[0].value,
                };
                return done(null, user);
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