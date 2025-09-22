import { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// Lazy loaded tabs
const ReviewsTab = lazy(() => import("../../components/ReviwesTab"));
const InfoTab = lazy(() => import("../../components/InfoTab"));
const DescriptionTab = lazy(() => import("../../components/DescriptionTab"));

const SkeletonLoader = () => (
    <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
);

const ProductDetails = () => {
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("red");
    const [activeTab, setActiveTab] = useState("description");

    const sizes = ["XS", "S", "M", "L", "XL"];
    const colors = ["red", "black", "white"];
    const images = [
        "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_0.jpg&w=1920&q=75",
        "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=1920&q=75",
        "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_2.jpg&w=1920&q=75",
        "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_3.jpg&w=1920&q=75",
        "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_4.jpg&w=1920&q=75",
    ];

    const visibleThumbnails = images.slice(0, 4);
    const hiddenCount = images.length - visibleThumbnails.length;

    const renderTabContent = () => {
        switch (activeTab) {
            case "info":
                return <InfoTab />;
            case "reviews":
                return <ReviewsTab />;
            case "description":
            default:
                return <DescriptionTab />;
        }
    };

    const tabs = [
        { id: "description", label: "Description" },
        { id: "info", label: "Additional Information" },
        { id: "reviews", label: "Reviews (2)" },
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-12">
            {/* Product Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>

                    <div className="grid grid-cols-4 gap-3">
                        {visibleThumbnails.map((img, i) => (
                            <motion.a href={img} key={i} whileHover={{ scale: 1.05 }}>
                                <div className="relative">
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${i}`}
                                        className="rounded-lg cursor-pointer border hover:border-black transition"
                                    />
                                    {i === visibleThumbnails.length - 1 && hiddenCount > 0 && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg text-white text-sm font-medium">
                                            +{hiddenCount} more
                                        </div>
                                    )}
                                </div>
                            </motion.a>
                        ))}

                        {images.slice(4).map((img, i) => (
                            <a href={img} key={`hidden-${i}`} className="hidden" />
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-semibold">Hub Accent Mirror</h2>
                    <p className="text-lg font-medium text-gray-700">$17</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Phasellus id aliquet quam. Fusce eget leo mauris vehicula elementum
                        gravida nec dui.
                    </p>

                    {/* Sizes */}
                    <div>
                        <h3 className="font-medium mb-2">Size</h3>
                        <div className="flex gap-2">
                            {sizes.map((size) => (
                                <motion.button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    whileTap={{ scale: 0.9 }}
                                    className={`px-3 py-1.5 rounded-lg border text-sm transition-all duration-300 ${selectedSize === size
                                        ? "bg-black text-white border-black"
                                        : "border-gray-300 hover:border-black"
                                        }`}
                                >
                                    {size}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div>
                        <h3 className="font-medium mb-2">Color</h3>
                        <div className="flex gap-3">
                            {colors.map((color) => (
                                <motion.div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    whileHover={{ scale: 1.1 }}
                                    className={`w-7 h-7 rounded-full cursor-pointer border-2 ${selectedColor === color
                                        ? "border-black"
                                        : "border-transparent"
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-black text-white px-5 py-2.5 rounded-xl shadow-md text-sm"
                        >
                            Add to Cart
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2.5 rounded-full border"
                        >
                            <Heart className="w-4 h-4" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2.5 rounded-full border"
                        >
                            <Share2 className="w-4 h-4" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Tabs Section */}
            <div className="space-y-6">
                <div className="flex gap-6 relative">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                ? "text-black"
                                : "text-gray-500 hover:text-black"
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <Suspense fallback={<SkeletonLoader />}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderTabContent()}
                        </motion.div>
                    </AnimatePresence>
                </Suspense>
            </div>
        </div>
    );
};

export default ProductDetails;
