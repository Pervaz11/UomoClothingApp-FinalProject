"use client";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

type Partner = {
    _id: string;
    name: string;
    image: string;
};

const PartnersSlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [partners, setPartners] = useState<Partner[]>([]);

    // Fetch partners from backend
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await axios.get("http://localhost:3000/partners");
                setPartners(res.data.partners || res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPartners();
    }, []);

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
                {[...partners, ...partners].map((partner, idx) => (
                    <div
                        key={idx}
                        className="flex-shrink-0 w-29 md:w-36 lg:w-40 flex items-center justify-center grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition"
                    >
                        <img
                            src={partner.image}
                            alt={partner.name}
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
