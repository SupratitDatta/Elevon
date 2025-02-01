import { mongooseConnect } from "@/database/connect";
import { Order } from "@/models/Order.model";

export default async function handler(req, res) {
    await mongooseConnect();
    res.json(await Order.find().sort({ createdAt: -1 }));
}