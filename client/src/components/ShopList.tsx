import { useEffect, useState } from "react";
import axios from "axios";
import ListCard from "./ListCard";

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

const ITEMS_PER_PAGE = 8;

const ShopList: React.FC<{ pagination?: boolean; sortOption: string; page: number }> = ({
    pagination = true,
    sortOption,
    page,
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:3000/products")
            .then((res) => {
                const data = res.data.products ?? [];
                setProducts(data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "az") return a.name.localeCompare(b.name);
        if (sortOption === "za") return b.name.localeCompare(a.name);
        if (sortOption === "low-high") return a.price - b.price;
        if (sortOption === "high-low") return b.price - a.price;
        return 0;
    });

    const paginatedProducts = pagination
        ? sortedProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
        : sortedProducts;

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {paginatedProducts.map((item) => (
                    <ListCard
                        key={item._id}
                        id={item._id}
                        title={item.name}
                        price={item.price}
                        images={item.images}
                        labels={item.labels}
                        discount={item.discount}
                        stock={0} />
                ))}
            </div>
        </div>
    );
};

export default ShopList;
