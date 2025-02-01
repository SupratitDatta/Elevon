// pages/api/products.js
import { mongooseConnect } from '@/database';
import { Product } from '@/models/Product.model';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await mongooseConnect();
        const { category } = req.query;

        let query = {};
        if (category) {
            // Use exact match for category
            query = { category: category };
        }

        const products = await Product.find(query).sort({ _id: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
}