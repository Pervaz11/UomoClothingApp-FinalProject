import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-hot-toast";

type Image = {
    url: string;
    alt: string;
};

type AccessoryCardProps = {
    id: string;
    title: string;
    price: number;
    stock: number;
    images: Image[];
};

const AccessoryCard: React.FC<AccessoryCardProps> = ({
    id,
    title,
    price,
    stock,
    images
}) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                productId: id,
                title,
                price,
                image: images?.[0]?.url || "/placeholder.jpg",
                quantity: 1,
                stock,
                id: "",
                type: "product"
            })
        );
        toast.success(`${title} added to cart!`);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
            {/* Wishlist */}
            <button className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow hover:scale-110 transition">
                <Heart className="w-4 h-4 text-gray-500" />
            </button>

            {/* Image */}
            <Link to={`/details/accessory/${id}`}>
                <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    <img
                        src={images[0]?.url || "/placeholder.jpg"}
                        alt={images[0]?.alt || title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>


            {/* Add to Cart */}
            <button
                onClick={handleAddToCart}
                className="absolute bottom-0 left-0 w-full bg-black bg-opacity-90 text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase font-medium"
            >
                Add to Cart
            </button>

            {/* Info */}
            <div className="p-3">
                <p className="text-xs text-gray-500 mb-1">Accessories</p>
                <Link to={`/details/${id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 hover:underline">
                        {title}
                    </h3>
                </Link>
                <p className="text-sm text-gray-900 font-semibold mt-1">
                    ${price.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default AccessoryCard;
