import mongoose from "mongoose";

const Schema = mongoose.Schema;
const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

export default mongoose.model("Admin", adminSchema);