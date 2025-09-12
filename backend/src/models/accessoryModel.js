import mongoose from "mongoose";
import accessorySchema from "../schemas/accessorySchema.js";

const Product = mongoose.model("Accesory", accessorySchema);

export default Product;
