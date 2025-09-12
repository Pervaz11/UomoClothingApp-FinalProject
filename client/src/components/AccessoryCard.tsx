import React from "react";
import { Heart } from "lucide-react";

type Image = {
    url: string;
    alt: string;
};

type AccessoryCardProps = {
    title: string;
    price: number;
    images: Image[];
};

const AccessoryCard: React.FC<AccessoryCardProps> = ({ title, price, images }) => {
    return (
        <div className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
            {/* Favorite icon */}
            <button className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow hover:scale-110 transition">
                <Heart className="w-4 h-4 text-gray-500" />
            </button>

            {/* Image */}
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                <img
                    src={images[0]?.url || "/placeholder.jpg"}
                    alt={images[0]?.alt || title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Add to Cart */}
            <button className="absolute bottom-0 left-0 w-full bg-black bg-opacity-90 text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                Add to Cart
            </button>

            {/* Info */}
            <div className="p-3">
                <p className="text-xs text-gray-500 mb-1">Accessories</p>
                <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-900 font-semibold mt-1">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default AccessoryCard;
