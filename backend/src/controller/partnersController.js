import Partner from '../models/partnersModel.js';

const parseIntOrDefault = (value, defaultValue) =>
    isNaN(parseInt(value)) ? defaultValue : parseInt(value);

// GET /partners
export const getPartners = async (req, res, next) => {
    try {
        const { search = '', page = '1', limit = '10' } = req.query;

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;

        const filter = {};
        if (search.trim()) filter.name = { $regex: search.trim(), $options: 'i' };

        const total = await Partner.countDocuments(filter);

        const partners = await Partner.find(filter)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({
            partners,
            total,
            page: pageNumber,
            pageSize: partners.length,
        });
    } catch (error) {
        next(error);
    }
};

// GET /partners/:id
export const getPartnerById = async (req, res, next) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) return res.status(404).json({ message: 'Partner not found' });

        res.status(200).json(partner);
    } catch (error) {
        next(error);
    }
};

// POST /partners
export const postPartner = async (req, res, next) => {
    try {
        const newPartner = new Partner(req.body);
        const savedPartner = await newPartner.save();

        res.status(201).json(savedPartner);
    } catch (error) {
        next(error);
    }
};

// DELETE /partners/:id
export const deletePartner = async (req, res, next) => {
    try {
        const deleted = await Partner.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Partner not found' });

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// PUT /partners/:id
export const updatePartner = async (req, res, next) => {
    try {
        const updated = await Partner.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            overwrite: true,
        });

        if (!updated) return res.status(404).json({ message: 'Partner not found' });

        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

// PATCH /partners/:id
export const patchPartner = async (req, res, next) => {
    try {
        const patched = await Partner.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!patched) return res.status(404).json({ message: 'Partner not found' });

        res.status(200).json(patched);
    } catch (error) {
        next(error);
    }
};
