/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Product = require("../models/Product");

module.exports = {
    find: async function (req, res) {
        const products = await Product.find();
        return res.json(products);
    },

    findOne: async function (req, res) {
        try {
            const product = await Product.findOne({ id: req.params.id });
            if (!product) return res.notFound();
            return res.json(product);
        } catch (err) {
            return res.serverError(err.message);
        }
    },

    create: async function (req, res) {
        const { id, name, price } = req.body;
        
        try {
            const newProduct = await Product.create({ id, name, price }).fetch();
            return res.status(201).json({
                message: "Create successfully",
                product: newProduct
            });
        } catch (err) {
            return res.status(400).json({
                error: "Fail to create product", 
                details: err.message 
            });
        }
    }, 

    update: async function (req, res) {
        const { name, price } = req.body;

        try {
            const updatedProduct = await Product.updateOne({ id:req.params.id }).set({ name, price });
            if (!updatedProduct) {
                return res.status(404).json({ error: "Product not found" });
            }
            return res.json({
                message: "Updated successfully",
                product: updatedProduct
            });
        } catch (err) {
            return res.status(500).json({ 
                error: "Fail to update product", 
                details: err.message 
            });
        }
    },

    destroy: async function (req, res) {
        try {
            const deletedProduct = await Product.destroyOne({id: req.params.id });
            if (!deletedProduct) {
                return res.status(404).json({ error: "Product not found" });
            }
            return res.json({
                message: "Deleted Successfully",
                product: deletedProduct
            });
        } catch (err) {
            return res.status(500).json({
                error: "Fail to delete product", 
                details: err.message 
            });
        }
    },

};

