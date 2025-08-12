import User from "../../models/user";

export default async function passportLocalStrategy(
  email: string,
  password: string,
  done: any
) {
  try {
    const user: User | null = await User.findOne({ where: { email } });

    if (!user) {
      // log error
      return done(null, false, { message: "Incorrect email or password!" });
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      return done(null, false, { message: "Incorrect email or password!" });
    }

    // generate token
    // const token = user.generateToken();

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
