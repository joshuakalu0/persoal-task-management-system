import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = "7d";

export function signJWT(payload) {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
}

export function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("expired") };
  }
}

export function getJWTSecretKey() {
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET is not set or is too short");
  }
  return JWT_SECRET;
}
