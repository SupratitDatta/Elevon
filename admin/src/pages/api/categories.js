import { Category } from "@/models/Category.model";
import { mongooseConnect } from "@/database/connect";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

async function getAllCategories(req, res) {
    try {
        const categories = await Category.find().populate('parent');
        res.json(categories);
        throw new ApiResponse(200, "Category fetched succesfully")
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createCategories(req, res) {
    try {
        const { name, parentCategory, properties } = req.body;
        const categoryDoc = await Category.create({
            name,
            parent: parentCategory || undefined,
            properties,
        });
        res.json(categoryDoc);
        throw new ApiResponse(200, "Category created and added succesfully")
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateCategories(req, res) {
    try {
        const { name, parentCategory, properties, _id } = req.body;
        const categoryDoc = await Category.updateOne({ _id }, {
            name,
            parent: parentCategory || undefined,
            properties,
        });
        res.json(categoryDoc);
        throw new ApiResponse(200, "Category updated succesfully")
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteCategories(req, res) {
    try {
        const { _id } = req.query;
        await Category.deleteOne({ _id });
        res.json('Deleted');
        throw new ApiResponse(200, "Category deleted succesfully")
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();
    await isAdminRequest(req, res);

    switch (method) {
        case 'GET':
            await getAllCategories(req, res);
            break;
        case 'POST':
            await createCategories(req, res);
            break;
        case 'PUT':
            await updateCategories(req, res);
            break;
        case 'DELETE':
            await deleteCategories(req, res);
            break;
        default:
            res.status(405);
            throw new ApiError(405, "Unknown Request")
            break;
    }
}