import { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import LightGallery from "lightgallery/react";
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
    const [quantity, setQuantity] = useState(1);

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
        <div className="mx-auto p-6 space-y-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Images */}
                <div>
                    <LightGallery speed={500} plugins={[]}>
                        <a href={images[0]}>
                            <motion.img
                                src={images[0]}
                                alt="Main Product"
                                className="rounded-2xl shadow-lg w-full object-cover mb-4 cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                        </a>

                        <div className="grid grid-cols-4 gap-4">
                            {visibleThumbnails.map((img, i) => (
                                <motion.a href={img} key={i} whileHover={{ scale: 1.05 }}>
                                    <div className="relative">
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${i}`}
                                            className="rounded-xl cursor-pointer border hover:border-black transition shadow-sm"
                                        />
                                        {i === visibleThumbnails.length - 1 && hiddenCount > 0 && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl text-white text-sm font-medium">
                                                +{hiddenCount} more
                                            </div>
                                        )}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </LightGallery>
                </div>

                {/* Right: Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    {/* Title & Price */}
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                            Hub Accent Mirror
                        </h2>
                        <div className="flex items-center gap-4 mt-3">
                            <p className="text-2xl font-semibold text-gray-900">$17</p>
                            <span className="text-sm text-gray-500">8k+ reviews</span>
                        </div>
                        <p className="text-base text-gray-600 mt-4 leading-relaxed max-w-lg">
                            Phasellus id aliquet quam. Fusce eget leo mauris vehicula elementum
                            gravida nec dui.
                        </p>
                    </div>

                    {/* Sizes */}
                    <div>
                        <h3 className="font-medium text-sm mb-3 text-gray-800">Size</h3>
                        <div className="flex gap-2">
                            {sizes.map((size) => (
                                <motion.button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    whileTap={{ scale: 0.9 }}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${selectedSize === size
                                        ? "bg-black text-white border-black shadow-md"
                                        : "border-gray-300 hover:border-black/60"
                                        }`}
                                >
                                    {size}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div>
                        <h3 className="font-medium text-sm mb-3 text-gray-800">Color</h3>
                        <div className="flex gap-3">
                            {colors.map((color) => (
                                <motion.div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    whileHover={{ scale: 1.1 }}
                                    className={`w-9 h-9 rounded-full cursor-pointer border-2 transition-all ${selectedColor === color
                                        ? "border-black shadow-md"
                                        : "border-gray-300 hover:border-black/40"
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 items-center">
                        {/* Counter */}
                        <div className="flex items-center border overflow-hidden shadow-sm">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                            >
                                -
                            </button>
                            <span className="px-5 py-2 text-sm font-medium">{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-black text-white px-8 py-3 shadow hover:shadow-lg transition text-sm font-medium"
                        >
                            Add to Cart
                        </motion.button>

                    </div>
                    <div className="flex gap-5">
                        {/* Wishlist */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-3 rounded-full border hover:border-black/60 transition shadow-sm"
                        >
                            <Heart className="w-5 h-5 text-gray-700" />
                        </motion.button>

                        {/* Share */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-3 rounded-full border hover:border-black/60 transition shadow-sm"
                        >
                            <Share2 className="w-5 h-5 text-gray-700" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Tabs Section */}
            <div className="space-y-6 mt-12">
                <div className="flex gap-8">
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
