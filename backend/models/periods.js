import mongoose from "mongoose";
const Schema = mongoose.Schema;
const periodsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Periods", periodsSchema);