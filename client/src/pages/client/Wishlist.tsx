import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import ListCard from "../../components/ListCard";

const mockProducts = [
  {
    id: "1",
    title: "Summer Dress",
    price: 49.99,
    images: [{ url: "/dress.jpg", alt: "Summer Dress" }],
  },
  {
    id: "2",
    title: "Cool Sneakers",
    price: 89.99,
    images: [{ url: "/sneakers.jpg", alt: "Sneakers" }],
  },
];

const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();

  const products = mockProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">My Wishlist</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ListCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
