import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
  isWishlisted?: boolean; // ⭐ Wishlist səhifəsindən gələn flag
};

const ListCard: React.FC<ListCardProps> = ({
  id,
  title,
  price,
  stock,
  images,
  labels,
  discount,
  isWishlisted = false,
}) => {
  const navigate = useNavigate();

  // ⭐ Açılışda birbaşa wishlist statusunu burdan götürür
  const [inWishlist, setInWishlist] = useState(isWishlisted);

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

  // ⭐ Normal product listində wishlist statusunu yoxlayır
  useEffect(() => {
    if (isWishlisted) return; // Wishlist page-dən gəlibsə API çağırma

    const checkWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const exists = res.data.items?.some(
          (item: any) => item.product?._id === id
        );
        setInWishlist(exists);
      } catch {
        console.warn("Could not check wishlist");
      }
    };

    checkWishlist();
  }, [id, isWishlisted]);

  // ❤️ Add / Remove Wishlist
  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to use wishlist.");
      navigate("/login");
      return;
    }

    try {
      if (inWishlist) {
        await axios.delete(`http://localhost:3000/wishlist/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        await axios.post(
          "http://localhost:3000/wishlist",
          { productId: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInWishlist(true);
        toast.success("Added to wishlist!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error updating wishlist");
    }
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/details/${id}`);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
      {/* ❤️ Wishlist Icon */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow hover:scale-110 transition"
      >
        <Heart
          className={`transition ${inWishlist ? "text-red-500 fill-red-500" : "text-gray-600"}`}
        />
      </button>

      {/* 🖼️ Image */}
      <Link to={`/details/${id}`}>
        <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          <img
            src={images[0]?.url || "/placeholder.jpg"}
            alt={images[0]?.alt || title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* 🔘 View Details */}
      <button
        onClick={handleDetailsClick}
        className="absolute uppercase font-medium bottom-0 left-0 w-full bg-black bg-opacity-90 text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        View Details
      </button>

      <div className="p-3">
        {/* 🏷 Labels */}
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

      {/* 📄 Title */}
      <Link to={`/details/${id}`}>
        <h3 className="text-sm p-2 font-semibold text-gray-800 hover:underline">
          {title}
        </h3>
      </Link>

      {/* 💵 Price */}
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
