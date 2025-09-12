import express from 'express';
import {
    getAccessories,
    getAccessoryById,
    postAccessory,
    deleteAccessory,
    updateAccessory,
    patchAccessory,
} from '../controller/accessoryController.js';

const router = express.Router();

router.get('/', getAccessories);
router.get('/:id', getAccessoryById);
router.post('/', postAccessory);
router.delete('/:id', deleteAccessory);
router.put('/:id', updateAccessory);
router.patch('/:id', patchAccessory);

export default router;
