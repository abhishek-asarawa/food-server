import userModel from "../models/user";

export const add = (data) => {
  return userModel.create({ ...data });
};
