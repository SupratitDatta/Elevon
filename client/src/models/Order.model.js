import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
    line_items: {
        type: Object
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        lowercase: true,
    },
    country: {
        type: String,
        required: true,
        lowercase: true
    },
    paid: {
        type: Boolean,
        required: true,
        lowercase: true
    },
}, {
    timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);