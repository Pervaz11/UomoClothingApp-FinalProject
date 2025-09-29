import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Description() {
    const { id } = useParams();
    const [accessory, setAccessory] = useState<any>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/accessory/${id}`)
            .then(res => setAccessory(res.data))
            .catch(err => console.error("Error fetching accessory:", err));
    }, [id]);

    if (!accessory) return <p></p>;

    return (
        <div className="">
            <h2 className="font-bold text-lg mb-2">Sed do eiusmod tempor incididunt ut labore</h2>
            <p className="text-gray-600 mb-4">{accessory.description}</p>

            <div className="grid grid-cols-2 gap-6">
                {/* Left column */}
                <div>
                    <h3 className="font-semibold mb-2">Why choose product?</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Material: {accessory.material}</li>
                        <li>Brand: {accessory.brand}</li>
                        <li>Category: {accessory.categories?.join(", ")}</li>
                    </ul>
                    <p className="mt-4"><b>Lining:</b> {accessory.material}</p>
                </div>

                {/* Right column */}
                <div>
                    <h3 className="font-semibold mb-2">Sample Number List</h3>
                    <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                        <li>SKU: {accessory.sku}</li>
                        <li>Stock: {accessory.stock}</li>
                        <li>Featured: {accessory.isFeatured ? "Yes" : "No"}</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
