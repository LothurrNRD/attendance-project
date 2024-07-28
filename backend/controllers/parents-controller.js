import Parents from "../models/parents.js";
import mongoose from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;

export const getAllParents = async (req, res, next) => {
    let parents;
    try {
        parents = await Parents.find();
    } catch (error) {
        console.log(error);
    }
    if (!parents || parents.length == 0) {
        return res.status(400).json({ message: 'No Parents' });
    }
    return res.status(200).json({ parents });
}

export const getParentById = async (req, res, next) => {
    let parent;
    try {
        parent = await Parents.findById(req.params.id); // `req.params` yerine `req.params.id` kullanın
    } catch (error) {
        console.log(error);
    }
    if (!parent) {
        return res.status(400).json({ message: "Couldn't find Parent" });
    }
    return res.status(200).json(parent);
}

export const createParent = async (req, res, next) => {
    const { name, phoneNumber } = req.body;
    let parent;
    console.log(req.body);
    if (!name || !phoneNumber) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        parent = new Parents({
            name, phoneNumber
        });
    } catch (error) {
        console.log(error);
    }
    try {
        await parent.save();
        return res.status(200).json({ message: 'Parent Saved', parent });
    } catch (error) {
        console.log(error);
    }
}

export const updateParent = async (req, res, next) => {
    const { _id, name, phoneNumber } = req.body;
    let parent;
    try {
        parent = Parents.findById(_id);
    } catch (error) {
        console.log(error);
    }
    try {
        await Parents.updateOne({ _id: _id }, { name: name, phoneNumber: phoneNumber });
        return res.status(200).json({ message: 'Parent Updated' });
    } catch (error) {
        console.log(error);
    }
}
