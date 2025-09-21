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
    const [tabLoading, setTabLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const tabs = ["All", "New Arrivals", "Best Seller", "Top Rated"];
    const itemsPerSlide = 4;

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

    const handleTabClick = (index: number) => {
        if (index === activeTab) return;
        setActiveTab(index);
        setTabLoading(true);
        setCurrentIndex(0);

        setTimeout(() => {
            setTabLoading(false);
        }, 500); // 500ms 
    };

    const getFilteredProducts = () => {
        switch (activeTab) {
            case 1:
                return products.filter(
                    (p) =>
                        p.labels?.includes("New Arrival") ||
                        (p.discount && p.discount.type === "percentage" && p.discount.value >= 20)
                );
            case 2:
                return products.filter(
                    (p) =>
                        p.labels?.includes("Best Seller") ||
                        (p.discount && p.discount.type === "fixed" && p.discount.value >= 10)
                );
            case 3:
                return products.filter(
                    (p) =>
                        p.labels?.includes("Top Rated") ||
                        (p.discount && new Date(p.discount.expiresAt || "").getTime() > Date.now())
                );
            default:
                return products;
        }
    };

    const filtered = getFilteredProducts();
    const totalSlides = Math.ceil(filtered.length / itemsPerSlide);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const renderCards = () => {
        if (tabLoading) {
            return (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                    {Array.from({ length: itemsPerSlide }).map((_, i) => (
                        <div
                            key={i}
                            className="w-full h-60 bg-gray-200 animate-pulse rounded-md"
                        ></div>
                    ))}
                </div>
            );
        }

        return (
            <div className="relative w-full mt-6 overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                        const slideItems = filtered.slice(
                            slideIndex * itemsPerSlide,
                            slideIndex * itemsPerSlide + itemsPerSlide
                        );
                        return (
                            <div
                                key={slideIndex}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-shrink-0 w-full px-2"
                            >
                                {slideItems.map((item) => (
                                    <ListCard
                                        key={item._id}
                                        title={item.name}
                                        price={item.price}
                                        images={item.images}
                                        labels={item.labels}
                                        discount={item.discount} id={""}                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-md rounded-full p-2 flex items-center justify-center transition-all duration-300 opacity-70 hover:opacity-100"
                >
                    <svg
                        className="w-5 h-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-md rounded-full p-2 flex items-center justify-center transition-all duration-300 opacity-70 hover:opacity-100"
                >
                    <svg
                        className="w-5 h-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </button>

                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i
                                ? "bg-black scale-125"
                                : "bg-gray-300 hover:scale-110"
                                }`}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex justify-center items-center gap-10 mt-6">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
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
