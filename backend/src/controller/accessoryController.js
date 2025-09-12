import Accessory from '../models/accessoryModel.js';

const parseIntOrDefault = (value, defaultValue) =>
    isNaN(parseInt(value)) ? defaultValue : parseInt(value);

// GET /accessories
export const getAccessories = async (req, res, next) => {
    try {
        const {
            search = '',
            sortBy = 'price',
            order = 'asc',
            page = '1',
            limit = '10',
        } = req.query;

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const sortOrder = order === 'desc' ? -1 : 1;

        const filter = {};
        if (search.trim()) filter.name = { $regex: search.trim(), $options: 'i' };

        const total = await Accessory.countDocuments(filter);

        const accessories = await Accessory.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({
            accessories,
            total,
            page: pageNumber,
            pageSize: accessories.length,
        });
    } catch (error) {
        next(error);
    }
};

// GET /accessories/:id
export const getAccessoryById = async (req, res, next) => {
    try {
        const accessory = await Accessory.findById(req.params.id);
        if (!accessory) return res.status(404).json({ message: 'Accessory not found' });

        res.status(200).json(accessory);
    } catch (error) {
        next(error);
    }
};

// POST /accessories
export const postAccessory = async (req, res, next) => {
    try {
        const newAccessory = new Accessory(req.body);
        const savedAccessory = await newAccessory.save();

        res.status(201).json(savedAccessory);
    } catch (error) {
        next(error);
    }
};

// DELETE /accessories/:id
export const deleteAccessory = async (req, res, next) => {
    try {
        const deleted = await Accessory.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Accessory not found' });
            return;
        }

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// PUT /accessories/:id
export const updateAccessory = async (req, res, next) => {
    try {
        const updated = await Accessory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            overwrite: true,
        });

        if (!updated) {
            res.status(404).json({ message: 'Accessory not found' });
            return;
        }

        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

// PATCH /accessories/:id
export const patchAccessory = async (req, res, next) => {
    try {
        const patched = await Accessory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!patched) {
            res.status(404).json({ message: 'Accessory not found' });
            return;
        }

        res.status(200).json(patched);
    } catch (error) {
        next(error);
    }
};