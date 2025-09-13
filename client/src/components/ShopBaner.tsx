const ShopBaner = () => {
    return (
        <section
            className="w-300 h-71 bg-no-repeat mx-auto m-10 border border-white rounded-2xl bg-contain relative"
            style={{
                backgroundImage: "url('https://uomo-nextjs-ecommerce.vercel.app/assets/images/shop/shop_banner_character1.png')",
            }}
        >

            <div className="flex my-10 flex-col md:flex-row items-center md:items-end justify-between p-10">
                {/* Left side */}
                <div className="flex-1">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-700 tracking-wide">
                        JACKETS & COATS
                    </h1>
                    <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold text-black">
                        {["ALL", "STAYHOME", "JACKETS", "HOODIES", "MEN", "WOMEN", "ACCESSORIES"].map((item) => (
                            <p
                                key={item}
                                className="relative cursor-pointer after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopBaner;
