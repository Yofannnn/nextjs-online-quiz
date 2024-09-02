import jwt, { Secret } from "jsonwebtoken";

export const signJWT = (
  payload: Object,
  option?: jwt.SignOptions | undefined
) => {
  return jwt.sign(payload, process.env.SESSION_SECRET as Secret, {
    ...(option && option),
    algorithm: "HS256",
  });
};

export const verifyJWT = (token: string) => {
  try {
    const decode = jwt.verify(token, process.env.SESSION_SECRET as Secret);
    return {
      valid: true,
      expired: false,
      decode,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === "jwt is expired or not eligible to use",
      decode: null,
    };
  }
};
