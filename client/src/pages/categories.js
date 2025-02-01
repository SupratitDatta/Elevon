import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Headphones, Tv, Watch } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const categories = [
    { name: 'Mobile Phones', icon: <Smartphone size={40} />, id: 'mobile' },
    { name: 'Laptops', icon: <Laptop size={40} />, id: 'laptop' },
    { name: 'Earbuds', icon: <Headphones size={40} />, id: 'earbuds' },
    { name: 'Smart TVs', icon: <Tv size={40} />, id: 'tv' },
    { name: 'Smartwatches', icon: <Watch size={40} />, id: 'smartwatch' },
];

export default function CategoriesAndProducts() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = selectedCategory
                    ? `/api/products?category=${selectedCategory}`
                    : '/api/products';
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setProducts(data);
            } 
            catch (error) {
                console.error('Error fetching products:', error);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    };

    return (
        <div>
            <Header />
            <div className="my-20 px-4 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Shop by Category</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`flex flex-col items-center p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer ${selectedCategory === category.id
                                ? 'bg-blue-100 border-2 border-blue-500'
                                : 'bg-gray-100 hover:bg-gray-50'
                                }`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <div className={`${selectedCategory === category.id
                                ? 'text-blue-500'
                                : 'text-gray-700'
                                }`}>
                                {category.icon}
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-center">
                                {category.name}
                            </h2>
                        </div>
                    ))}
                </div>

                {/* Products Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {selectedCategory
                            ? `${categories.find(c => c.id === selectedCategory)?.name}`
                            : 'All Products'}
                    </h2>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product._id} {...product} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        {selectedCategory
                                            ? 'No products found in this category.'
                                            : 'No products available.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}