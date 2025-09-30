import ProductCard from "./ProductCard";

type Product = {
    _id: string;
    name: string;
    price: number;
    discount?: { type: "percentage" | "fixed"; value: number };
    images?: { url: string }[];
    categories?: string[];
    reviews?: { rating: number }[];
    createdAt: string;
    stock?: number;
};

type Props = {
    products: Product[];
    view: "grid" | "list";
};

export default function ProductList({ products, view }: Props) {
    if (!products.length) {
        return <div className="text-center text-gray-400 py-10">No products found.</div>;
    }

    return (
        <div
            className={
                view === "grid"
                    ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-4"
            }
        >
            {products.map((p) => {
                const avgRating =
                    p.reviews && p.reviews.length
                        ? Number((p.reviews.reduce((a, r) => a + r.rating, 0) / p.reviews.length).toFixed(1))
                        : 0;

                return (
                    <ProductCard
                        key={p._id}
                        product={{
                            id: p._id,
                            name: p.name,
                            price: p.price,
                            discount: p.discount,
                            rating: avgRating,
                            image: p.images?.[0]?.url || "/placeholder.png",
                            category: p.categories?.[0] || "Uncategorized",
                            createdAt: p.createdAt,
                            stock: p.stock,
                        }}
                        view={view}
                    />
                );
            })}
        </div>
    );
}
