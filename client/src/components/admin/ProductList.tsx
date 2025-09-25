import ProductCard from "./ProductCard";

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

type Props = {
    products: Product[];
    view: "grid" | "list";
};

export default function ProductList({ products, view }: Props) {
    return (
        <div
            className={`grid gap-6 ${view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
                }`}
        >
            {products.map((p) => {
                const avgRating =
                    p.reviews && p.reviews.length
                        ? p.reviews.reduce((a, r) => a + r.rating, 0) / p.reviews.length
                        : 0;

                return (
                    <ProductCard
                        key={p._id}
                        product={{
                            id: p._id,
                            name: p.name,
                            price: p.price,
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
