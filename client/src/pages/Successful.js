import { motion } from 'framer-motion';

const Successful = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-white p-8 rounded-2xl shadow-2xl text-center"
            >
                <motion.h1
                    className="text-4xl font-bold text-green-600 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Payment Successful!
                </motion.h1>
                <motion.p
                    className="text-gray-700 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Thank you for your purchase. Your payment was processed successfully.
                </motion.p>
                <motion.a
                    href="/"
                    className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    Return to Home
                </motion.a>
            </motion.div>
        </div>
    );
};

export default Successful;