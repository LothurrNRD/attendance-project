import mongoose from "mongoose";

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'productSchema' }],
    situation: {
        type: String,
        enum: ['awaiting', 'shipped', 'delivered'],
        default: 'awaiting'
    },
    userId: { type: Schema.Types.ObjectId, ref: 'userSchema' }
})

export default mongoose.model("Orders", orderSchema);