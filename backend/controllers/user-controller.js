import User from "../models/user.js";
import bycrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(400).json({ message: "No User" })
    }
    return res.status(200).json({ users })
}
export const createUser = async (req, res, next) => {
    const { name, password, email } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "This user already exist" })
        }
    } catch (error) {
        console.log(error);
    }
    const hashedPass = bycrypt.hashSync(password)
    const user = new User({
        name, email, password: hashedPass
    })
    try {
        user.save()
    } catch (error) {
        console.log(error)
    }
    res.status(200).json({ user });
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(204).json({ message: "There is no User who has this email" });
        }
    } catch (error) {
        console.log(error);
    }
    const decodePassword = bycrypt.compareSync(password, existingUser.password)
    if (decodePassword) {
        res.status(200).json({ message: "Succesfully Logged In" });
    }
    else {
        res.status(400).json({ message: "Incorrect Password" });
    }
}