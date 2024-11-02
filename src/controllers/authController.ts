import { Request, Response } from "express";

const register = async (req: Request, res: Response): Promise<void> => {
  res.send("Register user");
};

const login = async (req: Request, res: Response): Promise<void> => {
  res.send("Login user");
};

const logout = async (req: Request, res: Response): Promise<void> => {
  res.send("Logout user");
};

export { register, login, logout };
