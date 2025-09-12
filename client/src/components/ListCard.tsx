import React from "react";
import { Heart } from "lucide-react";

type Discount = {
    type: "percentage" | "fixed";
    value: number;
    expiresAt?: string;
};

type Image = {
    url: string;
    alt: string;
};

type ListCardProps = {
    title: string;
    price: number;
    images: Image[];
    labels?: string[];
    discount?: Discount;
};

const ListCard: React.FC<ListCardProps> = ({ title, price, images, labels, discount }) => {
    const now = new Date();
    const isDiscountActive =
        discount &&
        discount.value > 0 &&
        (!discount.expiresAt || new Date(discount.expiresAt) > now);

    const finalPrice =
        isDiscountActive && discount?.type === "percentage"
            ? price - (price * discount.value) / 100
            : isDiscountActive && discount?.type === "fixed"
                ? Math.max(0, price - discount.value)
                : price;

    return (
        <div className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
            {/* Favorite icon */}
            <button className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow hover:scale-110 transition">
                <Heart className="w-4 h-4 text-gray-500" />
            </button>

            {/* Image */}
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                <img
                    src={images && images.length > 0 ? images[0].url : "/placeholder.jpg"}
                    alt={images && images.length > 0 ? images[0].alt : title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Add to Cart */}
            <button className="absolute bottom-0 left-0 w-full bg-black bg-opacity-90 text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                Add to Cart
            </button>

            {/* Info */}
            <div className="p-3">
                {labels && labels.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {labels.map((label, index) => (
                            <span
                                key={index}
                                className="text-[10px] bg-black text-white px-2 py-1 rounded-full uppercase tracking-wide"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                )}
                <p className="text-xs text-gray-500 mb-1">Dresses</p>
                <h3 className="text-sm font-semibold text-gray-800">{title}</h3>

                {/* Price + Discount */}
                <div className="mt-1 flex items-center gap-2">
                    <p className="text-sm text-gray-900 font-semibold">${finalPrice.toFixed(2)}</p>
                    {isDiscountActive && (
                        <p className="text-xs text-gray-500 line-through">${price.toFixed(2)}</p>
                    )}
                </div>

                <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-400 text-sm">★★★★★</span>
                    <span className="text-xs text-gray-500 ml-1">8k+ reviews</span>
                </div>
            </div>
        </div>
    );
};

export default ListCard;
