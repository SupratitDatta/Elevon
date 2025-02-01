import Head from "next/head";
import { CartContextProvider } from "@/components/CartData";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <CartContextProvider>
            <Head>
                <title>Elevon</title>
                <link rel="icon" type="image/svg+xml" href="/logo.png" />
                <meta name="description" content="Track locations in real-time with Orbion." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className="container">
                <Component {...pageProps} />
            </main>
        </CartContextProvider>
    );
}