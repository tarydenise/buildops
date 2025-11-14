"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User_1.default.findOne({ googleId: profile.id });
        if (existingUser)
            return done(null, existingUser);
        const newUser = new User_1.default({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            avatar: profile.photos?.[0].value,
        });
        await newUser.save();
        return done(null, newUser);
    }
    catch (err) {
        return done(err, null);
    }
}));
// serialize/deserialize user for session support
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
