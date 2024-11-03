import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User, { IUser } from "../models/User";
import * as Errors from "../errors";
import { createJWT } from "../utils";

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, name, password } = req.body;

  // check if email already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new Errors.BadRequestError("Email already in use.");
  }

  // check if this is the first account
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  // create new user in database
  const user = (await User.create({ name, email, password, role })) as IUser;
  const tokenUser = {
    name: user.name,
    userId: user._id.toString(),
    role: user.role,
  };

  // sign jwt token with a secret key and expiration
  const token = createJWT({ payload: tokenUser });

  // return token to client
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

const login = async (req: Request, res: Response): Promise<void> => {
  res.send("Login user");
};

const logout = async (req: Request, res: Response): Promise<void> => {
  res.send("Logout user");
};

export { register, login, logout };
