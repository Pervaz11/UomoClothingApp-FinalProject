import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-hot-toast";

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
    id: string;
    title: string;
    price: number;
    stock: number;
    images: Image[];
    labels?: string[];
    discount?: Discount;
};

const ListCard: React.FC<ListCardProps> = ({
    id,
    title,
    price,
    stock,
    images,
    labels,
    discount
}) => {
    const dispatch = useDispatch();
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

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                productId: id,
                title,
                price: finalPrice,
                image: images?.[0]?.url || "/placeholder.jpg",
                quantity: 1,
                stock: stock
            })
        );
        toast.success(`${title} added to cart!`);
    };

    return (  
        <div className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
            {/* Wishlist */}
            <button className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow hover:scale-110 transition">
                <Heart />
            </button>

            {/* Image */}
            <Link to={`/details/${id}`}>
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
                className="absolute uppercase font-medium bottom-0 left-0 w-full bg-black bg-opacity-90 text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
                Add to Cart
            </button>

            {/* Info */}
            <div className="p-3">
                {labels?.length ? (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {labels.map((label, idx) => (
                            <span
                                key={idx}
                                className="text-[10px] bg-black text-white px-2 py-1 rounded-full uppercase tracking-wide"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>

            {/* Title */}
            <Link to={`/details/${id}`}>
                <h3 className="text-sm p-2 font-semibold text-gray-800 hover:underline">
                    {title}
                </h3>
            </Link>

            <div className="mt-1 flex px-2 pb-2 items-center gap-2">
                <p className="text-sm text-gray-900 font-semibold">
                    ${finalPrice.toFixed(2)}
                </p>
                {isDiscountActive && (
                    <p className="text-xs text-gray-500 line-through">
                        ${price.toFixed(2)}
                    </p>
                )}
            </div>
        </div>
    );
};


export default ListCard;
