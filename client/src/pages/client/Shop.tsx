import { useEffect, useState } from "react";
import axios from "axios";
import ShopBaner from "../../components/ShopBaner";
import ListCard from "../../components/ListCard";

type Product = {
    _id: string;
    name: string;
    price: number;
    images: { url: string; alt: string }[];
    labels?: string[];
    discount?: {
        type: "percentage" | "fixed";
        value: number;
        expiresAt?: string;
    };
};

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:3000/products")
            .then((res) => {
                const data = res.data;
                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }
            })
            .catch((err) => console.error("Error fetching products:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <ShopBaner />
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {loading ? (
                    <div className="flex justify-center items-center mt-14">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <ListCard
                                key={item._id}
                                title={item.name}
                                price={item.price}
                                images={item.images}
                                labels={item.labels}
                                discount={item.discount}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Shop;
