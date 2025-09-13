import { useRef, useEffect, useState } from "react";

const partners = [
    "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fbrand1.png&w=256&q=75",
    "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fbrand3.png&w=384&q=75",
    "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fbrand2.png&w=256&q=75",
    "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fbrand4.png&w=256&q=75",
    "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fbrand5.png&w=256&q=75",
];

const PartnersSlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Auto scroll effect
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const interval = setInterval(() => {
            slider.scrollLeft += 1;
            if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
                slider.scrollLeft = 0;
            }
        }, 15);

        return () => clearInterval(interval);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <h2 className="text-lg font-semibold mb-8">Company Partners</h2>
            <div
                ref={sliderRef}
                className="flex gap-12 md:gap-16 overflow-x-scroll scrollbar-hide cursor-grab no-scrollbar"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {[...partners, ...partners].map((logo, idx) => (
                    <div
                        key={idx}
                        className="flex-shrink-0 w-28 md:w-36 lg:w-40 flex items-center justify-center grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition"
                    >
                        <img
                            src={logo}
                            alt="partner logo"
                            className="h-10 md:h-12 object-contain"
                        />
                    </div>
                ))}
            </div>
            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default PartnersSlider;
