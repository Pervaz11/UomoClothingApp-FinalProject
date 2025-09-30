import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiFilter } from "react-icons/ci";

type Filters = {
  categories?: string[];
  colors?: string[];
  sizes?: string[];
  brands?: string[];
  priceRange?: [number, number];
};

const categories = ["Dresses", "Sweatshirts", "Jackets", "Jeans", "Men"];
const colors = ["#1A1A1A", "#C0A060", "#A0A0A0", "#E0B060"];
const sizes = ["XS", "S", "M", "L", "XL"];
const brands = ["Adidas", "Balmain", "Balenciaga", "Zara"];

const FilterSidebar: React.FC<{ setFilters: (f: Filters) => void }> = ({
  setFilters,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 5000]);

  const toggle = (item: string, state: string[], setState: any) => {
    if (state.includes(item)) {
      setState(state.filter((c) => c !== item));
    } else {
      setState([...state, item]);
    }
  };

  const handleApply = () => {
    setFilters({
      categories: selectedCategories,
      colors: selectedColors,
      sizes: selectedSizes,
      brands: selectedBrands,
      priceRange,
    });
    setOpen(false);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setPriceRange([20, 5000]);
    setFilters({});
  };

  return (
    <div className="z-50">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-5 py-1.5 border-b text-gray-700 hover:bg-gray-100 transition"
      >
        <CiFilter size={20} /> Filter
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
              className="fixed w-80 top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 p-6 z-50 overflow-y-auto rounded-l-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">FILTER BY</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-black text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categories</h3>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() =>
                        toggle(cat, selectedCategories, setSelectedCategories)
                      }
                    />
                    {cat}
                  </label>
                ))}
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggle(color, selectedColors, setSelectedColors)}
                      style={{ backgroundColor: color }}
                      className={`w-6 h-6 rounded-full border-2 ${selectedColors.includes(color)
                          ? "border-black scale-110"
                          : "border-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggle(size, selectedSizes, setSelectedSizes)}
                      className={`px-3 py-1 border rounded-md text-sm ${selectedSizes.includes(size)
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Brands</h3>
                {brands.map((b) => (
                  <label key={b} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() =>
                        toggle(b, selectedBrands, setSelectedBrands)
                      }
                    />
                    {b}
                  </label>
                ))}
              </div>

              {/* Price */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price</h3>
                <input
                  type="range"
                  min={20}
                  max={5000}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([20, Number(e.target.value)])
                  }
                  className="w-full accent-black"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
                >
                  Reset
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-md"
                >
                  Apply
                </button>
              </div>
            </motion.div>

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
