import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface DescriptionTabProps {
    description: string;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ }) => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error("Error fetching product:", err));
    }, [id]);

    if (!product) return <p></p>;

    return (
        <div>
            <h2 className="font-bold text-lg mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="grid grid-cols-2 gap-6">
                {/* Left column */}
                <div>
                    <h3 className="font-semibold mb-2">Why choose product?</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Material: {product.material}</li>
                        <li>Brand: {product.brand}</li>
                        <li>Categories: {product.categories?.join(", ")}</li>
                    </ul>
                    <p className="mt-4"><b>Lining:</b> {product.material}</p>
                </div>

                {/* Right column */}
                <div>
                    <h3 className="font-semibold mb-2">Product Details</h3>
                    <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                        <li>SKU: {product.sku}</li>
                        <li>Stock: {product.stock}</li>
                        <li>Featured: {product.isFeatured ? "Yes" : "No"}</li>
                        <li>Status: {product.status ?? "—"}</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default DescriptionTab;  // ✅ add this
