import { Product } from "@/models/Product.model";
import { mongooseConnect } from "@/database/connect";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { ApiResponse } from "@/utils/ApiResponse";
import { ApiError } from "@/utils/ApiError";

const getAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        // Check if any products are found
        if (products.length === 0) {
            throw new ApiError(404, "No products found");
        }
        res.json(products); // Send the products data to the frontend
    }
    catch (error) {
        // Handle any errors
        console.error("Error fetching products:", error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }
        else {
            res.status(500).json(new ApiResponse(500, null, "Internal server error"));
        }
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.query.id;
        // Find the product by ID in the database
        const product = await Product.findOne({ _id: productId });
        // Check if the product exists
        if (!product) {
            console.log("Product not found");
            throw new ApiError(404, "Product not found");
        }
        console.log("Product found:", product);
        res.json(product); // Send the product data to the frontend
    }
    catch (error) {
        // Handle any errors
        console.error("Error fetching product:", error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }
        else {
            res.status(500).json(new ApiResponse(500, null, "Internal server error"));
        }
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, description, price, images, category, properties } = req.body;
        // Check if title is given or not
        if (!title.trim()) {
            throw new ApiError(400, "Title is required");
        }
        // Check if price is entered or not
        if (!price.trim()) {
            throw new ApiError(400, "Price is required");
        }
        // Check if price is a valid number or not
        if (isNaN(parseFloat(price))) {
            throw new ApiError(400, "Price must be a valid number");
        }
        // Set description to empty if nothing is provided
        const trimmedDescription = description ? description.trim() : " ";

        // Create the data object in the database
        const productData = await Product.create({
            title, description: trimmedDescription, price, images, category, properties,
        });
        res.json(true);
        throw new ApiResponse(201, "Product created and added successfully");
    }

    catch (error) {
        // Handle any other errors
        console.error("Error creating product:", error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(new ApiError(error.statusCode, null, error.message));
        }
        else {
            res.status(500).json(new ApiError(500, null, "Internal server error"));
        }
    }
};

const updateProduct = async (req, res) => {
    try {
        const { title, description, price, images, category, properties, _id } = req.body;
        // Check if title is given or not
        if (!title.trim() && title != null) {
            throw new ApiError(400, "Title is required");
        }
        // Check if price is a valid number or not
        if (isNaN(parseFloat(price))) {
            throw new ApiError(400, "Price must be a valid number");
        }
        // Check if any data is actually changed or not
        const existingProduct = await Product.findById(_id);
        if (!existingProduct) {
            throw new ApiError(404, "Product not found");
        }
        const isDataChanged = (
            existingProduct.title !== title ||
            existingProduct.description !== description ||
            existingProduct.price !== price ||
            existingProduct.images !== images ||
            existingProduct.category !== category ||
            JSON.stringify(existingProduct.properties) !== JSON.stringify(properties)
        );
        if (!isDataChanged) {
            res.status(500).json(new ApiError(500, null, "No change detected"));
            return res.json(false); // No changes detected, return false
        }

        // Update the product data in the database
        await Product.updateOne({ _id }, { title, description, price, images, category, properties });
        res.json(true);
        throw new ApiResponse(200, "Product updated succesfully")
    }

    catch (error) {
        // Handle any other errors
        console.error("Error updating product:", error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }
        else {
            res.status(500).json(new ApiError(500, "Internal server error"));
        }
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.query.id;
        // Check if the product exists
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            throw new ApiError(404, "Product does not exists");
        }

        // Delete the product from the database
        await Product.deleteOne({ _id: productId });
        res.json(true); // Product deleted successfully
        throw new ApiResponse(404, "Product deleted successfully");
    }

    catch (error) {
        // Handle any errors
        console.error("Error deleting product:", error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
        }
        else {
            res.status(500).json(new ApiResponse(500, null, "Internal server error"));
        }
    }
};

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === 'GET') {
        if (req.query?.id) {
            await getProductById(req, res);
        }
        else {
            await getAllProducts(req, res);
        }
    }

    if (method === 'POST') {
        await createProduct(req, res);
    }

    if (method === 'PUT') {
        await updateProduct(req, res);
    }

    if (method === 'DELETE') {
        await deleteProduct(req, res);
    }
}