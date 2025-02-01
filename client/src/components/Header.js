import { useContext, useState } from "react";
import Link from "next/link";
import { CartContext } from "@/components/CartData";
import styles from "../styles/Header.module.css";

export default function Header() {
    const { cartProducts } = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);

    return (
        <header className={styles.styledHeader}>
            <div className="center-nav text-xl">
                <div className={styles.wrapper}>
                    <div className="flex justify-center items-center">
                        <img src="/logo.png" className="w-10 h-10 mr-4"></img>
                        <Link href="/" className={`text-2xl ${styles.logo}`}>Elevon</Link>
                    </div>
                    <nav className={`${styles.styledNav} ${mobileNavActive ? styles.active : ''}`}>
                        <Link href="/">Home</Link>
                        <Link href="/products">All products</Link>
                        <Link href="/categories">Categories</Link>
                        <Link href="/cart">Cart ({cartProducts.length})</Link>
                    </nav>
                    <button className={styles.navButton} onClick={() => setMobileNavActive(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}