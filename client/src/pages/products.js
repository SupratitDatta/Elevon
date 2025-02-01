import Header from "@/components/Header";
import { mongooseConnect } from "@/database";
import { Product } from "@/models/Product.model";
import ProductCard from "@/components/ProductCard";
import styles from "../styles/ProductPage.module.css"

export default function ProductsPage({ products }) {
    return (
        <>
            <Header />
            <div className="center">
                <h1 className="title text-3xl font-bold text-center">All products</h1>
                <div className={styles.container}>
                    {products?.length > 0 && products.map(product => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, { sort: { '_id': -1 } });
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        }
    };
}