import Product from "../models/product.js";

export const getAllProduct = async (req, res, next) => {
    let products;
    try {
        products = await Product.find();
    } catch (error) {
        console.log(error)
    }
    if (!products) {
        return res.status(400).json({ message: 'No Products' })
    }
    return res.status(200).json({ products })
}

export const createProduct = async (req, res, next) => {
    const { name, weight, price, stock } = req.body;
    try {
        let existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(404).json({ message: 'This product exist' })
        }
    } catch (error) {
        console.log(error);
    }
    const product = new Product({
        name, weight, price, stock
    })
    try {
        product.save();
    } catch (error) {
        console.log(error);
    }
    return res.status(200).json({ message: 'Product Saved' })
}

export const updateProduct = async (req, res, next) => {
    const { _id, name, weight, price, stock } = req.body;
    try {
        let existingProduct = Product.findById(_id);
        if (!existingProduct) {
            return res.status(400).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
    try {
        await Product.updateOne({ _id: _id }, { name: name, weight: weight, price: price, stock: stock });
    } catch (error) {
        console.log(error);
    }
    return res.status(200).json({ message: 'Product Updated' })
}

export const deleteProduct = async (req, res, next) => {
    let productId = req.params._id;
    try {
        await Product.deleteOne({ _id: productId });
    } catch (error) {
        console.log(error);
    }
    return res.status(200).json({ message: 'Product Deleted' })
}