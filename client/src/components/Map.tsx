import { useState } from "react";

const Map = () => {
    const [mapLoaded, setMapLoaded] = useState(false);

    return (
        <div className="mt-10 w-full max-w-5xl mx-auto aspect-[16/9] relative">
            {!mapLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-3"></div>
                    <span className="text-gray-700 font-semibold text-lg tracking-wide">
                        Loading map...
                    </span>
                </div>
            )}
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.45537023438!2d28.73198755!3d41.0049823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa3a48f5c25b1%3A0x14b1b3d3c5853a6d!2sIstanbul!5e0!3m2!1sen!2str!4v1694525445623!5m2!1sen!2str"
                className="absolute inset-0 w-full h-full rounded-lg"
                loading="lazy"
                onLoad={() => setMapLoaded(true)}
            />
        </div>
    );
};

export default Map;
