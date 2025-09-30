import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// ✅ product üçün interfeys
interface Product {
    weight?: string;
    dimensions?: {
        raw?: string;
    };
    sizes?: string[];
    colors?: { name: string }[];
    material?: string;
    storage?: string;
}

export default function Info() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!id) return;
        axios
            .get<Product>(`http://localhost:3000/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error("Error fetching product:", err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="space-y-2">
            <p><b>Weight:</b> {product.weight ?? "—"}</p>
            <p><b>Dimensions:</b> {product.dimensions?.raw ?? "—"}</p>
            <p><b>Sizes:</b> {product.sizes && product.sizes.length > 0 ? product.sizes.join(", ") : "—"}</p>
            <p><b>Colors:</b> {product.colors && product.colors.length > 0 ? product.colors.map((c) => c.name).join(", ") : "—"}</p>
            <p><b>Material:</b> {product.material ?? "—"}</p>
            <p><b>Storage:</b> {product.storage ?? "—"}</p>
        </div>
    );
}
