import mongoose from "mongoose";
const Schema = mongoose.Schema
const classesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    Children: { type: Schema.Types.ObjectId, ref: 'Children' }
})

export default mongoose.model("Classes", classesSchema);