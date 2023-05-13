import * as jwt from "jsonwebtoken";

interface IJWTData {
  uid: number;
}

type TVerify = IJWTData | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN";
const keyJwt = process.env.JWT_SECRET;

const sing = (data: IJWTData): string | "JWT_SECRET_NOT_FOUND" => {
  if (!keyJwt) return "JWT_SECRET_NOT_FOUND";
  return jwt.sign(data, keyJwt, {
    expiresIn: "24h",
  });
};
const verify = (token: string): TVerify => {
  if (!keyJwt) return "JWT_SECRET_NOT_FOUND";
  try {
    const decode = jwt.verify(token, keyJwt);
    if (typeof decode === "string") return "INVALID_TOKEN";
    return decode as IJWTData;
  } catch (error) {
    return "INVALID_TOKEN";
  }
};

export const JWTService = {
  sing,
  verify,
};
