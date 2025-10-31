import { model } from "mongoose";
import wishlistSchema from "../schemas/wishlistSchema.js";

const WishlistModel = model("Wishlist", wishlistSchema);

export default WishlistModel;