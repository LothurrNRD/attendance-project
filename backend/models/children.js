import mongoose from "mongoose";

const Schema = mongoose.Schema;
const childrenSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    information: {
        type: String,
    },
    signedTime: {
        type: Date,
    },
    signedOutTime: {
        type: Date,
    },
    parent: { type: Schema.Types.ObjectId, ref: 'Parents' },
    situation: {
        type: String,
        enum: ['signIn', 'signOut'],
        default: 'signOut'
    },
    class: { type: Schema.Types.ObjectId, ref: 'Classes' }
})

export default mongoose.model("Children", childrenSchema);