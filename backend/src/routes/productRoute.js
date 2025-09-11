import express from 'express';
import {
    getProducts,
    getProductById,
    postProduct,
    deleteProduct,
    updateProduct,
    patchProduct,
} from '../controller/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', postProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.patch('/:id', patchProduct);

export default router;