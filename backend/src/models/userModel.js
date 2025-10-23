import { model } from "mongoose";
import userSchema from "../schemas/userSchema.js";

const UserModel = model("User", userSchema);

export default UserModel;