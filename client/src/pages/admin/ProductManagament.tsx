import { useState, useEffect } from "react";
import axios from "axios";
import Filters from "../../components/admin/AdminFilters";
import ProductList from "../../components/admin/ProductList";
import AccessoryList from "../../components/admin/AccesoryList";
import ViewToggle from "../../components/admin/ViewToggle";
import Pagination from "../../components/Pagination";
import AddProductModal from "../../components/admin/AddPorudtcModal";

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

    // 🔹 Məhsulları gətirən funksiya
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
        <div className="flex min-h-screen bg-gray-50 p-6">
            {/* Filters */}
            <aside className="w-64 pr-6">
                <Filters />
            </aside>

            {/* Content */}
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        {tab === "product" ? "Clothes" : "Accessories"}
                    </h1>

                    <div className="flex items-center gap-4">
                        {/* 🔹 Add Product Button (yalnız məhsul tabında) */}
                        {tab === "product" && (
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                ➕ Add Product
                            </button>
                        )}

                        {/* 🔹 Switch Tabs */}
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

                {/* 🔹 Tab Content */}
                {tab === "product" ? (
                    <>
                        <ProductList products={products} view={view} />
                        <Pagination
                            page={page}
                            setPage={setPage}
                            total={Math.ceil(total / limit)}
                        />
                    </>
                ) : (
                    <AccessoryList view={view} />
                )}
            </main>

            {/* 🔹 Add Product Modal */}
            {showAddModal && (
                <AddProductModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={fetchProducts}
                />
            )}
        </div>
    );
}
