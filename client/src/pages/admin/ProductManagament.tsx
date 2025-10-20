import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../../components/admin/ProductList";
import AccessoryList from "../../components/admin/AccesoryList";
import ViewToggle from "../../components/admin/ViewToggle";
import AddProductModal from "../../components/admin/AddPorudtcModal";
import Pagination from "../../components/admin/AdminPagination";
import { FaPlus } from "react-icons/fa";

type Product = {
    _id: string;
    name: string;
    price: number;
    images?: { url: string }[];
    categories?: string[];
    reviews?: { rating: number }[];
    createdAt: string;
    stock?: number;
};

export default function Products() {
    const [tab, setTab] = useState<"product" | "accessory">("product");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    const limit = 6;

    const fetchProducts = async () => {
        if (tab !== "product") return;
        try {
            const res = await axios.get("http://localhost:3000/products", {
                params: { page, limit, sortBy: "createdAt", order: "desc" },
            });
            setProducts(res.data.products);
            setTotal(res.data.total);
        } catch (error) {
            console.error("❌ Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, tab]);

    return (
        <div className="flex min-h-screen p-6">
            {/* Content */}
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        {tab === "product" ? "Clothes" : "Accessories"}
                    </h1>

                    <div className="flex items-center gap-4">
                        {tab === "product" && (
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-3 py-2 flex items-center gap-2 font-semibold duration-300 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition"
                            >
                                <FaPlus /> Add Product
                            </button>
                        )}

                        {/* Switch Tabs */}
                        <div className="inline-flex rounded-full bg-gray-200 p-1">
                            <button
                                onClick={() => setTab("product")}
                                className={`px-4 py-1 rounded-full text-sm font-medium transition ${tab === "product"
                                    ? "bg-black text-white shadow-md"
                                    : "text-gray-600 hover:text-black"
                                    }`}
                            >
                                Clothes
                            </button>
                            <button
                                onClick={() => setTab("accessory")}
                                className={`px-4 py-1 rounded-full text-sm font-medium transition ${tab === "accessory"
                                    ? "bg-black text-white shadow-md"
                                    : "text-gray-600 hover:text-black"
                                    }`}
                            >
                                Accessories
                            </button>
                        </div>

                        <ViewToggle view={view} setView={setView} />
                    </div>
                </div>

                {/* Tab Content */}
                {tab === "product" ? (
                    <>
                        <ProductList products={products} view={view} />

                        {/* Pagination */}
                        <Pagination
                            currentPage={page}
                            totalItems={total}
                            pageSize={limit}
                            onPageChange={(p) => setPage(p)}
                        />
                    </>
                ) : (
                    <AccessoryList view={view} />
                )}

                {/* Add Product Modal */}
                {showAddModal && (
                    <AddProductModal
                        onClose={() => setShowAddModal(false)}
                        onSuccess={fetchProducts}
                    />
                )}
            </main>
        </div>
    );
}
