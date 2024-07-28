import Classes from "../models/classes.js";
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

// Tüm sınıfları getiren controller
export const getAllClasses = async (req, res, next) => {
    try {
        const classes = await Classes.find().populate('Children');
        if (!classes || classes.length === 0) {
            return res.status(404).json({ message: 'No classes found' });
        }
        return res.status(200).json({ classes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// ID'ye göre sınıf getiren controller
export const getClassById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const classItem = await Classes.findById(id).populate('Children');
        if (!classItem) {
            return res.status(404).json({ message: "Class not found" });
        }
        return res.status(200).json(classItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Yeni sınıf oluşturan controller
export const createClass = async (req, res, next) => {
    const { name, teacher, children } = req.body;

    if (!name || !teacher) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newClass = new Classes({
            name,
            teacher,
            Children: children // children optional olabilir, bu yüzden kontrol etmiyoruz
        });

        await newClass.save();
        return res.status(201).json({ message: 'Class created successfully', class: newClass });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Sınıf bilgilerini güncelleyen controller
export const updateClass = async (req, res, next) => {
    const { _id, name, teacher, children } = req.body;

    if (!_id || !name || !teacher) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const classItem = await Classes.findById(_id);
        if (!classItem) {
            return res.status(404).json({ message: "Class not found" });
        }

        classItem.name = name;
        classItem.teacher = teacher;
        classItem.Children = children || []; // children optional olabilir

        await classItem.save();
        return res.status(200).json({ message: 'Class updated successfully', class: classItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
