import mongoose from "mongoose";
const Schema = mongoose.Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' }
})

export default mongoose.model("Product", productSchema);