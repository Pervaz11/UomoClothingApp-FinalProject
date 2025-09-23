import mongoose from "mongoose";
import locationSchema from "../schemas/locationSchema.js";

const Location = mongoose.model("Location", locationSchema);

export default Location;