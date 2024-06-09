import mongoose from "mongoose";

const Schema = mongoose.Schema;
const parentsChema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    Child: { type: Schema.Types.ObjectId, ref: 'Children' }
})

export default mongoose.model("Parents", parentsChema);