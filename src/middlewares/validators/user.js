import { check } from "express-validator";

const isValidDOB = (val) => {
  const input = new Date(val).getTime();
  const curr = new Date();
  const currTime = curr.getTime();
  const lowestPossible = curr.setFullYear(curr.getFullYear() - 100);
  return input > lowestPossible && input < currTime;
};

const isPasswordMatch = (val, { req }) => val === req.body.password;

export const signIn = [
  check("email")
    .exists()
    .withMessage("Please provide email")
    .custom((val) => /\S+@\S+\.\S+/.test(val))
    .withMessage("Please provide valid email"),

  check("firstName")
    .exists()
    .withMessage("Please provide first name")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("first name must be between 1 to 40 char long"),

  check("lastName")
    .exists()
    .withMessage("Please provide last name")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("last name must be between 1 to 40 char long"),

  check("dob")
    .exists()
    .withMessage("Please provide D.O.B")
    .custom(isValidDOB)
    .withMessage("Please provide a valid D.O.B"),

  check("password")
    .exists()
    .withMessage("Please provide password")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password should be between 6 - 20 char long"),

  check("verifyPassword")
    .custom(isPasswordMatch)
    .withMessage("Password confirmation does not match to password"),
];
