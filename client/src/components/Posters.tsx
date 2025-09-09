const Posters = () => {
    return (
        <>
            <div>
                <div className="grid grid-cols-6 grid-rows-2 gap-2">
                    {[
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
                    ].map((img, i) => (
                        <div
                            key={i}
                            className="relative group row-span-2 overflow-hidden"
                        >
                            <img
                                src={`https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F${img}&w=640&q=75`}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                                {/* İki ağ kvadrat */}
                                <div className="w-10 h-10 border-2 border-white transform -rotate-45 m-2"></div>
                                <div className="w-10 h-10 border-2 border-white transform rotate-45 m-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Posters