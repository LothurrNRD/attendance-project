import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;

export const getAllOrders = async (req, res, next) => {
    let orders;
    try {
        orders = await Order.find();
    } catch (error) {
        console.log(error)
    }
    if (!orders || orders.length == 0) {
        return res.status(400).json({ message: 'No Orders' })
    }
    return res.status(200).json({ orders })
}

export const getOrdersByUserId = async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params);
    } catch (error) {
        console.log(error)
    }
    if (!user) {
        return res.status(400).json({ message: "Couldn't find User" })
    }
    let userOrders = [];
    for (let index = 0; index < user.orders.length; index++) {
        const x = new ObjectId(user.orders[index]);
        userOrders.push() = Order.findById(x);
    }
    console.log(userOrders);
    return res.status(200).json(userOrders);
}

export const createOrders = async (req, res, next) => {
    const { totalPrice, items, address, userId, situation } = req.body;
    let order;
    try {
        order = new Order({
            totalPrice, items, address, userId, situation
        })
    } catch (error) {
        console.log(error)
    }
    try {
        let orderTotalPrice = 0;
        let productDetails;
        for (let a = 0; a < order.items.length; a++) {
            const x = new ObjectId(order.items[a]);
            productDetails = await Product.findById(x);
            orderTotalPrice += productDetails.price;
        }
        order.totalPrice = orderTotalPrice;
        await order.save();
        const userID = new ObjectId(userId)
        const orderID = new ObjectId(order._id)
        const user = await User.findById(userID);
        user.orders.push(orderID);
        await user.save();
    } catch (error) {
        console.log(error)
    }
    return res.status(200).json({ message: 'Order Saved', order })
}

export const updateOrder = async (req, res, next) => {
    const { address, _id, items } = req.body;
    let order;
    try {
        order = Order.findById(_id);
    } catch (error) {
        console.log(error)
    }
    let product;
    let newTotalPrice = 0;
    try {
        for (let index = 0; index < items.length; index++) {
            console.log(items[index]);
            product = await Product.findById(items[index]);
            console.log(product);
            newTotalPrice += product.price;
            console.log(newTotalPrice);
        }
    } catch (error) {
        console.log(error)
    }
    try {
        await Order.updateOne({ _id: _id }, { address: address, items: items, totalPrice: newTotalPrice });
        return res.status(200).json({ message: 'Order Address Updated' })
    } catch (error) {
        console.log(error)
    }
}