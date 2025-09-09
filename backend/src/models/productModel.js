import mongoose from 'mongoose';
import { productSchema } from '../schemas/productSchemas.js';

const Product = mongoose.model('Product', productSchema);

export default Product;
