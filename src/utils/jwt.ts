import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload {
  name: string;
  userId: string;
  role: string;
}

const createJWT = ({ payload }: { payload: TokenPayload }): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }: { token: string }): JwtPayload | string => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export { createJWT, isTokenValid };
