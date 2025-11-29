import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListCard from "../../components/ListCard";

const WishlistPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.items || []);
    } catch {
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );

  if (!items.length)
    return <p className="text-center text-gray-500 mt-20">Your wishlist is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map((item) => {
          if (!item.product) return null;

          return (
            <ListCard
              key={item.product._id}
              id={item.product._id}
              title={item.product.name}
              price={item.product.price}
              stock={item.product.stock}
              images={item.product.images}
              discount={item.product.discount}
              labels={item.product.labels}
              isWishlisted={true}   // ⭐ ƏLAVƏ ET
            />
          );
        })}

      </div>
    </div>
  );
};

export default WishlistPage;
