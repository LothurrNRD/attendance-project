import Children from "../models/children.js";
import Parents from "../models/parents.js";
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
    return res.status(200).json({ children })
}

export const getChildrenById = async (req, res, next) => {
    let child;
    try {
        child = await Children.findById(req.params);
    } catch (error) {
        console.log(error)
    }
    if (!child) {
        return res.status(400).json({ message: "Couldn't find Child" })
    }
    return res.status(200).json(child);;
}

export const createChildren = async (req, res, next) => {
    const { name, surname, information, birthDate } = req.body;
    let child;
    if (!name || !surname || !information || !birthDate) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        child = new Children({
            name, surname, information, birthDate
        })
    } catch (error) {
        console.log(error)
    }
    try {
        await child.save();
        return res.status(200).json({ message: 'Child Saved', child });
    } catch (error) {
        console.log(error)
    }
}

export const updateChildren = async (req, res, next) => {
    const { _id, name, surname, information, birthDate } = req.body;
    let child;
    try {
        child = Children.findById(_id);
    } catch (error) {
        console.log(error)
    }
    try {
        await Children.updateOne({ _id: _id }, { name: name, surname: surname, information: information, birthDate: birthDate });
        return res.status(200).json({ message: 'Child Updated' })
    } catch (error) {
        console.log(error)
    }
}