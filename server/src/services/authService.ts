import bcrypt from "bcrypt";
import CustomError from "../utils/customError";
import jwt from "jsonwebtoken";
import { LoginParams } from "../interface/interfaces";

const authService = {

  async signIn({ email, password }: LoginParams) {
    // const user = await userModel.findOne({ email }).lean();
    // if (!user) {
    //   throw new CustomError("이메일과 비밀번호가 일치하지 않습니다", 401);
    // }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   throw new CustomError("이메일과 비밀번호가 일치하지 않습니다", 401);
    // }

    // const JWT_SECRET = process.env.JWT_SECRET || "";
    // const token = jwt.sign(
    //   { em: user.email, ro: user.role, userId: user._id },
    //   JWT_SECRET,
    //   {
    //     expiresIn: "1d",
    //   }
    // );

    // return token;
  },
};

export default authService;
