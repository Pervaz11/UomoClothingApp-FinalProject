import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/slideshow-character1.png";
import image2 from "../assets/slideshow-character2.png";
import patern from "../assets/slideshow-pattern.webp";

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    highlight: string;
    button: string;
    image: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "SUMMER SALE STYLISH",
        subtitle: "NEW TREND",
        highlight: "WOMENS",
        button: "DISCOVER MORE",
        image: image1,
    },
    {
        id: 2,
        title: "FRESH COLLECTION 2025",
        subtitle: "JUST ARRIVED",
        highlight: "MENS",
        button: "SHOP NOW",
        image: image2,
    },
];

const CustomSlider: React.FC = () => {
    const [current, setCurrent] = useState(0);


    return (
        <div className="relative w-full h-170 overflow-hidden bg-cover bg-[#F5E6E0] bg-center" style={{ backgroundImage: `url(${patern})` }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-24"
                >
                    <motion.div
                        className="max-w-lg text-center md:text-left mt-12 md:mt-0"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-red-500 font-semibold text-base sm:text-xl tracking-wide">
                            {slides[current].subtitle}
                        </p>
                        <h1 className="text-2xl text-gray-800 sm:text-5xl font-semibold leading-tight mt-2 sm:mt-3">
                            {slides[current].title}
                        </h1>
                        <h2 className="text-3xl text-black sm:text-6xl font-extrabold mt-2">
                            {slides[current].highlight}
                        </h2>
                        <p className="mt-4 sm:mt-6 ml-1 relative font-medium text-black transition-all duration-300 hover:text-black before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all text-sm sm:text-lg before:duration-300 hover:before:w-20">
                            {slides[current].button}
                        </p>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="flex justify-center md:justify-end md:items-end md:mt-0 w-full md:w-1/2"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={slides[current].image}
                            alt="Slider Model"
                            className="w-full md:w-auto max-h-[500px] object-contain"
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-6 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full border border-gray-500 transition ${index === current ? "bg-gray-900" : "bg-transparent"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomSlider;
