import passport, { DoneCallback } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user";
import passportLocalStrategy from "./passport/passportLocalStrategy";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { Role } from "../models";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    passportLocalStrategy
  )
);

//jwt opt
const jwtops: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

// jwt strategy
passport.use(
  "jwt",
  new JwtStrategy(jwtops, async (jwt_payload, done: DoneCallback) => {
    try {
      const user: User | null = await User.findByPk(jwt_payload.id, {
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "role", "permission"],
          },
        ],
      });

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

passport.deserializeUser(async (id: number, done: any) => {
  try {
    const user: User | null = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
