import { validationResult } from "express-validator";
import response from "../../utils/response";
import simplyfyErr from "../../utils/simplyfyErr";

export default (req, res, next) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    const singleKeyError = simplyfyErr(err.array());
    const errors = singleKeyError.map((e) => e.msg);
    const message = errors.join(",");
    if (message.length > 0) return response(res, null, message, true, 400);
  }
  next();
};
