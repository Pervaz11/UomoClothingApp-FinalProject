const Posters = () => {
    const images = [
        "insta1.jpg",
        "insta2.jpg",
        "insta3.jpg",
        "insta4.jpg",
        "insta5.jpg",
        "insta6.jpg",
        "insta7.jpg",
        "insta8.jpg",
        "insta9.jpg",
        "insta10.jpg",
        "insta11.jpg",
        "insta12.jpg",
    ];

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="relative group overflow-hidden aspect-[3/4]"
                    >
                        <img
                            src={`https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F${img}&w=640&q=75`}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                            <div className="w-10 h-10 border-2 border-white transform -rotate-45 m-2"></div>
                            <div className="w-10 h-10 border-2 border-white transform rotate-45 m-2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posters;
