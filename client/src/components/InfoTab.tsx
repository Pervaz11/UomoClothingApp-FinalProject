import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Info() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error("Error fetching product:", err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className=" space-y-2">
            <p><b>Weight:</b> {product.weight ?? "—"}</p>
            <p><b>Dimensions:</b> {product.dimensions?.raw ?? "—"}</p>
            <p><b>Sizes:</b> {product.sizes?.length > 0 ? product.sizes.join(", ") : "—"}</p>
            <p><b>Colors:</b> {product.colors?.map((c: any) => c.name).join(", ") || "—"}</p>
            <p><b>Material:</b> {product.material}</p>
            <p><b>Storage:</b> {product.storage ?? "—"}</p>
        </div>
    );
}
