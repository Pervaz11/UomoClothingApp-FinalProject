import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
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

type Filters = {
    categories?: string[];
    colors?: string[];
    sizes?: string[];
    brands?: string[];
    priceRange?: [number, number];
};

const ITEMS_PER_PAGE = 8;

const mapSortOption = (sort: string) => {
    switch (sort) {
        case "az":
            return "name:asc";
        case "za":
            return "name:desc";
        case "low-high":
            return "price:asc";
        case "high-low":
            return "price:desc";
        default:
            return undefined;
    }
};

const ShopList: React.FC<{
    filters: Filters;
    pagination?: boolean;
    sortOption: string;
    page: number;
}> = ({ filters, pagination = true, sortOption, page }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [, setTotalProducts] = useState<number>(0);

    useEffect(() => {
        setLoading(true);

        const params = {
            categories: filters.categories?.join(","),
            colors: filters.colors?.join(","),
            sizes: filters.sizes?.join(","),
            brands: filters.brands?.join(","),
            minPrice: filters.priceRange?.[0],
            maxPrice: filters.priceRange?.[1],
            sort: mapSortOption(sortOption),
            page,
        };

        axios
            .get("http://localhost:3000/products", {
                params,
                paramsSerializer: (p) => qs.stringify(p),
            })
            .then((res) => {
                const data = res.data.products ?? [];
                setProducts(data);
                setTotalProducts(res.data.total ?? data.length);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [filters, sortOption, page]);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "az") return a.name.localeCompare(b.name);
        if (sortOption === "za") return b.name.localeCompare(a.name);
        if (sortOption === "low-high") return a.price - b.price;
        if (sortOption === "high-low") return b.price - a.price;
        return 0;
    });

    const paginatedProducts = pagination
        ? sortedProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
        : sortedProducts;

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {paginatedProducts.map((item) => (
                    <ListCard
                        key={item._id}
                        id={item._id}
                        title={item.name}
                        price={item.price}
                        images={item.images}
                        labels={item.labels}
                        discount={item.discount}
                        stock={0}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShopList;
