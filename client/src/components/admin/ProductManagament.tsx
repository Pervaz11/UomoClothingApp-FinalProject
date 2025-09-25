import { useState, useEffect } from "react";
import axios from "axios";
import Filters from "../../components/admin/AdminFilters";
import ProductList from "../../components/admin/ProductList";
import ViewToggle from "../../components/admin/ViewToggle";
import Pagination from "../../components/Pagination";

// Backend-dən gələn məhsul tipi
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
    const [view, setView] = useState<"grid" | "list">("grid");
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const limit = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products", {
                    params: {
                        page,
                        limit,
                        sortBy: "createdAt",
                        order: "desc",
                    },
                });

                setProducts(res.data.products);
                setTotal(res.data.total);
            } catch (error) {
                console.error("❌ Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, [page]);

    return (
        <div className="flex min-h-screen bg-gray-50 p-6">
            {/* Filters */}
            <aside className="w-64 pr-6">
                <Filters />
            </aside>

            {/* Content */}
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Products</h1>
                    <ViewToggle view={view} setView={setView} />
                </div>

                <ProductList products={products} view={view} />

                <Pagination
                    page={page}
                    setPage={setPage}
                    total={Math.ceil(total / limit)}
                />
            </main>
        </div>
    );
}
