import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
    {
        line_items: {
            type: Object,
            required: true,
            index: true
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        streetAddress: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        paid: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Order = models?.Order || model('Order', OrderSchema);