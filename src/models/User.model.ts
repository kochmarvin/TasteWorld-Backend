import mongoose, { Schema, Document } from 'mongoose';

let userSchema : Schema = new mongoose.Schema({
    _id: { type: mongoose.SchemaTypes.ObjectId },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    cart: { type: Array },
    picturePath: { type: String, default: 'placeholder.jpg'},
}, { collection: 'User'});

export interface User extends Document {
    _id: any,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    cart: [],
    picturePath: string,
};

export default mongoose.model<User>('User', userSchema);