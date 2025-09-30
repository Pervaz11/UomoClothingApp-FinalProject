import { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReviewsTab = lazy(() => import("../../components/ReviwesTab"));
const InfoTab = lazy(() => import("../../components/InfoTab"));
const DescriptionTab = lazy(() => import("../../components/DescriptionTab"));

const Details = () => {
    const { id } = useParams<{ id?: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("red");
    const [activeTab, setActiveTab] = useState("description");
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        axios
            .get(`http://localhost:3000/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error("Error fetching product:", err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = () => {
        if (!product?._id) return;
        dispatch(
            addToCart({
                productId: product._id,
                title: product.title || product.name,
                price: product.price,
                image: product.images?.[0]?.url || "/placeholder.jpg",
                quantity,
                stock: product.stock || 0,
                id: "",
                type: "product",
            })
        );
    };

    const isOutOfStock = product?.stock === 0;

    // Skeleton while loading
    if (loading) {
        return (
            <div className="mx-auto p-6 max-w-7xl space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <Skeleton height={500} borderRadius={16} />
                    </div>
                    <div className="space-y-8">
                        <Skeleton width={300} height={40} />
                        <Skeleton width={120} height={30} />
                        <Skeleton count={3} />
                        <div className="flex gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} width={50} height={40} borderRadius={8} />
                            ))}
                        </div>
                        <div className="flex gap-3">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} circle width={40} height={40} />
                            ))}
                        </div>
                        <div className="flex gap-4 items-center">
                            <Skeleton width={100} height={40} />
                            <Skeleton width={120} height={45} />
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} width={100} height={30} />
                        ))}
                    </div>
                    <Skeleton height={200} borderRadius={12} />
                </div>
            </div>
        );
    }

    if (!product) return <p className="p-6">Product not found</p>;

    const sizes = ["XS", "S", "M", "L", "XL"];
    const colors = ["red", "black", "white"];
    const images = product.images?.map((img: any) => img.url) || [];

    return (
        <div className="mx-auto p-6 max-w-7xl space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div>
                    <LightGallery speed={500}>
                        {images.length > 0 && (
                            <a href={images[0]}>
                                <motion.img
                                    src={images[0]}
                                    alt={product.title}
                                    className="rounded-2xl shadow-lg w-full object-cover mb-4 cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </a>
                        )}
                    </LightGallery>
                </div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl font-bold">{product.title}</h2>
                    <p className="text-2xl font-semibold">${product.price}</p>
                    <p>{product.description}</p>

                    {/* Sizes */}
                    <div>
                        <h3 className="font-medium text-sm mb-3">Size</h3>
                        <div className="flex gap-2">
                            {sizes.map((size) => (
                                <motion.button
                                    key={size}
                                    onClick={() => !isOutOfStock && setSelectedSize(size)}
                                    whileTap={{ scale: !isOutOfStock ? 0.9 : 1 }}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium ${selectedSize === size
                                            ? "bg-black text-white border-black shadow-md"
                                            : "border-gray-300 hover:border-black/60"
                                        } ${isOutOfStock ? "bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed" : ""}`}
                                    disabled={isOutOfStock}
                                >
                                    {size}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div>
                        <h3 className="font-medium text-sm mb-3">Color</h3>
                        <div className="flex gap-3">
                            {colors.map((color) => (
                                <motion.div
                                    key={color}
                                    onClick={() => !isOutOfStock && setSelectedColor(color)}
                                    whileHover={{ scale: !isOutOfStock ? 1.1 : 1 }}
                                    className={`w-9 h-9 rounded-full border-2 cursor-pointer ${selectedColor === color ? "border-black shadow-md" : "border-gray-300 hover:border-black/40"
                                        } ${isOutOfStock ? "bg-gray-300 border-gray-300 cursor-not-allowed" : ""}`}
                                    style={{ backgroundColor: isOutOfStock ? "#d1d5db" : color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex gap-4 items-center">
                        {isOutOfStock ? (
                            <span className="text-red-600 font-semibold text-lg">Out of Stock</span>
                        ) : (
                            <>
                                <div className="flex items-center border overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-5 py-2 text-sm font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-black text-white px-8 py-3 shadow hover:shadow-lg text-sm font-medium"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </motion.button>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Tabs */}
            <div className="space-y-6">
                <div className="flex">
                    {["description", "info", "reviews"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-medium ${activeTab === tab
                                ? "border-b-2 border-black text-black"
                                : "text-gray-500"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="p-6 bg-white rounded-lg">
                    <AnimatePresence mode="wait">
                        {activeTab === "description" && (
                            <motion.div key="description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Suspense fallback={<Skeleton count={5} />}>
                                    <DescriptionTab description={product.description} />
                                </Suspense>
                            </motion.div>
                        )}
                        {activeTab === "info" && (
                            <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Suspense fallback={<Skeleton count={5} />}>
                                    <InfoTab product={product} />
                                </Suspense>
                            </motion.div>
                        )}
                        {activeTab === "reviews" && (
                            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Suspense fallback={<Skeleton count={5} />}>
                                    <ReviewsTab productId={product._id} />
                                </Suspense>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Details;
