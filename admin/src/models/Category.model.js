import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        parent: {
            type: mongoose.Types.ObjectId,
            ref: 'Category'
        },
        properties: [{
            type: Object,
            required: true,
            lowercase: true,
        }]
    }
);

export const Category = models?.Category || model('Category', CategorySchema);