import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiFilter } from "react-icons/ci";

const categories = [
  "Dresses", "Sweatshirts", "Jackets", "Jeans", "Men",
  "Shorts", "Swimwear", "T-Shirts & Tops", "Trousers", "Jumpers & Cardigans"
];

const colors = ["#1A1A1A", "#C0A060", "#A0A0A0", "#E0B060", "#E0A0A0", "#E08080"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const brands = [
  { name: "Adidas", count: 2 },
  { name: "Balmain", count: 7 },
  { name: "Balenciaga", count: 10 },
  { name: "Burberry", count: 39 },
  { name: "Kenzo", count: 95 },
  { name: "Givenchy", count: 1092 },
  { name: "Zara", count: 48 }
];

const FilterSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="z-50">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-5 py-1.5 border-b text-gray-700 hover:bg-gray-100 transition"
      >
        <CiFilter size={20} />
        Filter
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
              className="fixed w-80 top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 p-6 z-50 overflow-y-auto rounded-l-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">FILTER BY</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-black text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Product Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">PRODUCT CATEGORIES</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className="text-left text-gray-700 hover:underline"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">COLOR</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      style={{ backgroundColor: color }}
                      className="w-6 h-6 rounded-full border-2 border-gray-300 hover:scale-110 transition"
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">SIZES</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100 transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">BRANDS</h3>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full mb-2 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div className="flex flex-col gap-2 text-sm">
                  {brands.map((b) => (
                    <label key={b.name} className="flex items-center justify-between cursor-pointer hover:text-black">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" />
                        {b.name}
                      </div>
                      <span className="text-gray-400">{b.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3">PRICE</h3>
                <div className="flex justify-between text-sm mb-3">
                  <span>$20</span>
                  <span>$70987</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={70987}
                  className="w-full accent-black"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition">
                  Reset
                </button>
                <button className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-md">
                  Apply
                </button>
              </div>
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSidebar;
