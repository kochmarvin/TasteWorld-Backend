import mongoose, { Schema, Document } from 'mongoose';

let recipeSchema : Schema = new mongoose.Schema({
    _id: { type: mongoose.SchemaTypes.ObjectId },
    name: { type: String, required: true},
    preperation: { type: String, required: true},
    ingredients: { type: Array, required: true },
    persons: { type: Number, required: true},
    duration: { type: String, required: true},
    picturePath: { type: String, default: 'food-placeholder.jpg'},
    creatorId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
}, { collection: 'Recipe'});

export interface Recipe extends Document {
    _id: any,
    name: string,
    preperation: string,
    ingredients: Ingredient[],
    persons: number,
    duration: string,
    picturePath: string,
    creatorId: any
};

export interface Ingredient {
    name: string,
    amount: number,
    unit: string
}

export default mongoose.model<Recipe>('Recipe', recipeSchema);