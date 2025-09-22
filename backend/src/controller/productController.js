import Product from '../models/productModel.js';
import { applyDiscount } from '../service/applyDiscount.js';

const parseIntOrDefault = (value, defaultValue) =>
    isNaN(parseInt(value)) ? defaultValue : parseInt(value);

// GET /products
export const getProducts = async (req, res, next) => {
    try {
        const {
            search = '',
            category,
            brand,
            color,
            size,
            priceMin,
            priceMax,
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
        if (category) filter.categories = category;
        if (brand) filter.brand = brand;
        if (color) filter.colors = { $elemMatch: { hex: color } }; // color hex ilə
        if (size) filter.sizes = size;
        if (priceMin || priceMax) filter.price = {};
        if (priceMin) filter.price.$gte = parseFloat(priceMin);
        if (priceMax) filter.price.$lte = parseFloat(priceMax);

        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        const productsWithDiscount = products.map(p => ({
            ...p.toObject(),
            discountedPrice: applyDiscount(p),
        }));

        res.status(200).json({
            products: productsWithDiscount,
            total,
            page: pageNumber,
            pageSize: productsWithDiscount.length,
        });
    } catch (error) {
        next(error);
    }
};



// GET /products/:id
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({
            ...product.toObject(),
            discountedPrice: applyDiscount(product),
        });
    } catch (error) {
        next(error);
    }
};

// POST /products
export const postProduct = async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        next(error);
    }
};

// DELETE /products/:id
export const deleteProduct = async (req, res, next) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// PUT /products/:id
export const updateProduct = async (req, res, next) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            overwrite: true,
        });

        if (!updated) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

// PATCH /products/:id 
export const patchProduct = async (req, res, next) => {
    try {
        const patched = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!patched) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json(patched);
    } catch (error) {
        next(error);
    }
};