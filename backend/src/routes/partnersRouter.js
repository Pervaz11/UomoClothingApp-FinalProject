import express from 'express';
import {
    getPartners,
    getPartnerById,
    postPartner,
    deletePartner,
    updatePartner,
    patchPartner,
} from '../controller/partnersController.js';

const router = express.Router();

router.get('/', getPartners);
router.get('/:id', getPartnerById);
router.post('/', postPartner);
router.delete('/:id', deletePartner);
router.put('/:id', updatePartner);
router.patch('/:id', patchPartner);

export default router;
