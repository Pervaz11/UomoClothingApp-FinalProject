import { model } from "mongoose";
import userSchema from "../schemas/userSchema.js";

const UserModel = model("User", userSchema);

export default UserModel;
export const create = (data) => UserModel.create(data);
export const findOne = (query) => UserModel.findOne(query);
export const findById = (id) => UserModel.findById(id);
