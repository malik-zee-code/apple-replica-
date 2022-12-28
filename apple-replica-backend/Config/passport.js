import passport from "passport";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader("x-auth-token");
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findOne({ username: jwt_payload.username });
    if (!user) {
      return done(err, false);
    }
    done(null, user);
  })
);
