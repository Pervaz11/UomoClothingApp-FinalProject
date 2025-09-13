import mongoose from "mongoose";
import accessorySchema from "../schemas/accessorySchema.js";

const Accesory = mongoose.model("Accesory", accessorySchema);

export default Accesory;
