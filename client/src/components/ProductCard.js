import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/components/CartData";
import Button from "@/utils/Button";
import styles from "../styles/ProductCard.module.css";

export default function ProductBox({ _id, title, description, price, images }) {
    const { addProduct } = useContext(CartContext);
    const url = '/product/' + _id;

    return (
        <div className={styles.productWrapper}>
            <Link href={url} className={styles.whiteBox}>
                <div> <img src={images?.[0]} alt="" className="w-auto h-32" /> </div>
            </Link>
            <div className={styles.productInfoBox}>
                <Link href={url} className={styles.producttitle}>{title}</Link>
                <div className={styles.priceRow}>
                    <div className={styles.price}>Rs.{price}</div>
                    <Button block onClick={() => addProduct(_id)} primary outline>
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
}