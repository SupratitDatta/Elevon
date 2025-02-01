import ProductCard from "@/components/ProductCard";
import styles from "../styles/Product.module.css";

export default function Products({ products }) {
    return (
        <div className="center">
            <h2 className={styles.title}>New Arrivals</h2>
            <div className={styles.productCard}>
                {products?.length > 0 && products.map(product => (
                    <ProductCard key={product._id} {...product} />
                ))}
            </div>
        </div>
    );
}