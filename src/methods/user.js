import userModel from "../models/user";

export const add = (data) => {
  return userModel.create({ ...data });
};

export const findUserByEmail = (email) => {
  return userModel.findOne({ email });
};

export const findUserById = (id) => {
  return userModel.findById(id);
};
