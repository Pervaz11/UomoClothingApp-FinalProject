const InfoTab = () => {
    return (
        <div className="flex flex-col gap-6 text-gray-800">
            <div className="flex gap-18 md:gap-50">
                <h1 className="font-semibold text-xl">Weight</h1>
                <p className="font-normal text-lg">1.25 kg</p>
            </div>

            <div className="flex gap-9 md:gap-40">
                <h1 className="font-semibold text-xl">Dimensions</h1>
                <p className="font-normal text-lg">90 x 60 x 90 cm</p>
            </div>

            <div className="flex gap-25 md:gap-56">
                <h1 className="font-semibold text-xl">Size</h1>
                <p className="font-normal text-lg">XS, S, M, L, XL</p>
            </div>

            <div className="flex gap-22 md:gap-53">
                <h1 className="font-semibold text-xl">Color</h1>
                <p className="font-normal text-lg">Black, Orange, White</p>
            </div>

            <div className="flex gap-17 md:gap-48">
                <h1 className="font-semibold text-xl">Storage</h1>
                <p className="font-normal text-lg">
                    Relaxed fit shirt-style dress with a rugged
                </p>
            </div>
        </div>
    );
};

export default InfoTab;
