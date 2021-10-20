import jwt from "jsonwebtoken";
import fs from "fs";
import { join } from "path";

const audience = ["http://localhost:3000"];
const issuer = "http://localhost:5000";
const algorithm = "ES256";

const getKey = (isRefresh = false) => {
  const path = join(
    __dirname,
    `../../${isRefresh ? "refreshPrivate.key" : "accessPrivate.key"}`
  );
  return fs.readFileSync(path, "utf-8");
};

export const getToken = (data, isRefresh = false) => {
  const key = getKey(isRefresh);
  const expiresIn = isRefresh ? "7d" : "15m";
  return jwt.sign(data, key, {
    algorithm,
    expiresIn,
    audience,
    issuer,
    subject: data.id.toString(),
  });
};
