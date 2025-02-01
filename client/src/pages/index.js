import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product.model";
import { mongooseConnect } from "@/database";
import NewProducts from "@/components/Products";

export default function HomePage({ featuredProduct, newProducts }) {
    return (
        <div>
            <Header />
            <Featured product={featuredProduct} />
            <NewProducts products={newProducts} />
        </div>
    );
}

export async function getServerSideProps() {
    const featuredProductId = '679d216e0398ed90f6c61426';
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
    return {
        props: {
            featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
        },
    };
}