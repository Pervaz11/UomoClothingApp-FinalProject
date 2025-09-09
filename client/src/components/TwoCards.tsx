// import { Link } from "react-router-dom";
import banner_1 from "../assets/banner_1.jpg";
import banner_2 from "../assets/banner_2.jpg";

const TwoCards = () => {
    return (
        <>
            <div className="sm:flex flex-col sm:flex-row gap-5">
                <div className="relative flex-1 text-white h-80 sm:h-[400px]">
                    <img
                        src={banner_1}
                        alt="Women's T-Shirts"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center sm:left-5 sm:top-50 top-30 text-whit p-5">
                        <h2 className="text-2xl font-bold">Starting At $19</h2>
                        <h3 className="text-3xl font-semibold">Women's T-Shirts</h3>
                        <h3 className="text-xl uppercase transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-20 sm:text-lg relative mt-2 font-medium">
                            Shop Now
                        </h3>
                    </div>
                </div>

                <div className="relative flex-1 h-80 sm:h-[400px]">
                    <img
                        src={banner_2}
                        alt="Women's T-Shirts"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center sm:left-5 top-30 sm:top-50 text-black p-5">
                        <h2 className="text-2xl font-bold">Starting At $19</h2>
                        <h3 className="text-3xl font-semibold">Women's T-Shirts</h3>
                        <h3 className="text-xl uppercase transition-all duration-300 hover:text-black before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-20 sm:text-lg relative mt-2 font-medium">
                            Shop Now
                        </h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TwoCards;
