import Header from "@/components/Header";
import styles from "../styles/Cart.module.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartData";
import { ShoppingCart, MinusCircle, PlusCircle, Check } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                    setIsLoading(false);
                })
        } 
        else {
            setProducts([]);
            setIsLoading(false);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, []);

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, city, postalCode, streetAddress, country,
            cartProducts,
        });
        if (response.data.url) {
            window.location = response.data.url;
        }
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    if (isSuccess) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 animate-gradient-xy">
                    <div className="max-w-3xl mx-auto px-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center transform transition-all duration-500 hover:scale-105">
                            <div className="mb-4 flex justify-center">
                                <div className="rounded-full bg-green-100 p-3 animate-bounce">
                                    <Check className="w-8 h-8 text-green-500" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanks for your order!</h1>
                            <p className="text-gray-600">We will email you when your order will be sent.</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className={`${styles.slidein} ${styles.animategradientxy} pt-[15vh] min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-12 animate-gradient-xy`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3 slide-in" style={{ animationDelay: '0.1s' }}>
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                                <div className="flex items-center gap-2 mb-6">
                                    <ShoppingCart className="w-6 h-6 text-indigo-600" />
                                    <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                                </div>

                                {isLoading ? (
                                    <div className="text-center py-12">
                                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-r-transparent"></div>
                                    </div>
                                ) : !cartProducts?.length ? (
                                    <div className="text-center py-12 text-gray-500">
                                        Your cart is empty
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="border-b border-gray-200">
                                                <tr>
                                                    <th className="py-4 px-2 text-left text-sm font-semibold text-gray-900">Product</th>
                                                    <th className="py-4 px-2 text-center text-sm font-semibold text-gray-900">Quantity</th>
                                                    <th className="py-4 px-2 text-right text-sm font-semibold text-gray-900">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {products.map((product, index) => (
                                                    <tr key={product._id} className="slide-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                                                        <td className="py-4 px-2">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105">
                                                                    <img
                                                                        src={product.images[0]}
                                                                        alt={product.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                                                                    {product.title}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-2">
                                                            <div className="flex items-center justify-center gap-3">
                                                                <button
                                                                    onClick={() => lessOfThisProduct(product._id)}
                                                                    className="text-gray-500 hover:text-indigo-600 transform transition-all duration-300 hover:scale-110"
                                                                >
                                                                    <MinusCircle className="w-5 h-5" />
                                                                </button>
                                                                <span className="w-8 text-center font-medium">
                                                                    {cartProducts.filter(id => id === product._id).length}
                                                                </span>
                                                                <button
                                                                    onClick={() => moreOfThisProduct(product._id)}
                                                                    className="text-gray-500 hover:text-indigo-600 transform transition-all duration-300 hover:scale-110"
                                                                >
                                                                    <PlusCircle className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-2 text-right font-medium">
                                                            Rs. {cartProducts.filter(id => id === product._id).length * product.price}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="border-t-2 border-gray-200">
                                                    <td colSpan="2" className="py-4 px-2 text-right font-semibold text-gray-900">Total:</td>
                                                    <td className="py-4 px-2 text-right font-bold text-indigo-600">Rs. {total}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!!cartProducts?.length && (
                            <div className="lg:w-1/3 slide-in" style={{ animationDelay: '0.3s' }}>
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Information</h2>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={ev => setName(ev.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={ev => setEmail(ev.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={city}
                                                onChange={ev => setCity(ev.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Postal Code"
                                                value={postalCode}
                                                onChange={ev => setPostalCode(ev.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Street Address"
                                            value={streetAddress}
                                            onChange={ev => setStreetAddress(ev.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Country"
                                            value={country}
                                            onChange={ev => setCountry(ev.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                                        />
                                        <button
                                            // onClick={goToPayment}
                                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium transform transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <Link href="/Successful">Continue to Payment</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}