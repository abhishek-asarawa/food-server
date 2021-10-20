import { decode } from "jsonwebtoken";

import response from "../../utils/response";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return response(res, null, "No token found", true, 400);

    const jwtToken = token.split(" ")[1];

    const data = decode(jwtToken);

    req.userId = data.id;
    next();
  } catch (err) {
    next(err);
  }
};
