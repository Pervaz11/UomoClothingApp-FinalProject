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

const Products = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const tabs = ["All", "New Arrivals", "Best Seller", "Top Rated"];

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:3000/products")
            .then(res => {
                const data = res.data;
                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.error("Expected array in `data.products` but got:", data);
                    setProducts([]);
                }
            })
            .catch(err => console.error("Error fetching products:", err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [activeTab]);

    const getFilteredProducts = () => {
        if (!Array.isArray(products)) return [];

        switch (activeTab) {
            case 1:
                return products.filter(p => p.labels?.includes("New Arrival"));
            case 2:
                return products.filter(p => p.labels?.includes("Best Seller"));
            case 3:
                return products.filter(p => p.labels?.includes("Top Rated"));
            default:
                return products;
        }
    };

    const renderCards = () => {
        const filtered = getFilteredProducts().slice(0, 4);

        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
                {filtered.map((item) => (
                    <ListCard
                        key={item._id}
                        title={item.name}          // ✅ title əvəzinə name
                        price={item.price}
                        images={item.images}       // ✅ image əvəzinə images
                        labels={item.labels}
                        discount={item.discount}   // ✅ discount da ötürülür
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex justify-center items-center gap-10 mt-6">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`relative text-sm sm:text-lg mt-2 uppercase transition-all duration-300 
                            ${activeTab === index ? "text-black font-semibold" : "text-gray-500 hover:text-black"} 
                            before:absolute before:bottom-0 before:left-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 
                            ${activeTab === index ? "before:w-5" : "before:w-0 hover:before:w-10"}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center mt-14">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                </div>
            ) : (
                renderCards()
            )}
        </div>
    );
};

export default Products;