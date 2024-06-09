import Children from "../models/children.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;

export const getAllChildren = async (req, res, next) => {
    let children;
    try {
        children = await Children.find();
    } catch (error) {
        console.log(error)
    }
    if (!children || children.length == 0) {
        return res.status(400).json({ message: 'No Children' })
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

export const createChildren = async (req, res, next) => {
    const { name, surname, classes, birthDate } = req.body;
    let child;
    try {
        child = new Children({
            name, surname, classes, birthDate
        })
    } catch (error) {
        console.log(error)
    }
    try {
        await child.save();
    } catch (error) {
        console.log(error)
    }
    return res.status(200).json({ message: 'Child Saved', child })
}

export const updateChildren = async (req, res, next) => {
    const { name, surname, classes, birthDate } = req.body;
    let order;
    try {
        order = Children.findById(_id);
    } catch (error) {
        console.log(error)
    }
    try {
        await Children.updateOne({ _id: _id }, { name: name, surname: surname, classes: classes, birthDate: birthDate });
        return res.status(200).json({ message: 'Child Updated' })
    } catch (error) {
        console.log(error)
    }
}