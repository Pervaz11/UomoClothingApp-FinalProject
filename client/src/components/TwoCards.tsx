// import { Link } from "react-router-dom";
import banner_1 from "../assets/banner_1.jpg";
import banner_2 from "../assets/banner_2.jpg";

const TwoCards = () => {
    return (
        <>
            <div className="sm:flex grid grid-cols-1 gap-5 p-5">
                <div className="relative inline-block">
                    <img src={banner_1} alt="Women's T-Shirts" className="w-full h-60" />
                    <div className="absolute w-full text-white top-1/2 left-5 right-5 bottom-0 flex flex-col justify-center bg-opacity-50">
                        <h2 className="text-2xl font-bold">Starting At $19</h2>
                        <h3 className="text-3xl font-semibold">Women's T-Shirts</h3>
                        <h3 className="text-xl uppercase text-white transition-all duration-300 hover:text-white before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-20 sm:text-lg relative mt-2 font-medium">Shop Now</h3>
                    </div>
                </div>
                <div className="relative inline-block">
                    <img src={banner_2} alt="Women's T-Shirts" className="w-full h-60" />
                    <div className="absolute w-full text-black top-1/2 left-5 right-5 bottom-0 flex flex-col justify-center bg-opacity-50">
                        <h2 className="text-2xl font-bold">Starting At $19</h2>
                        <h3 className="text-3xl font-semibold">Women's T-Shirts</h3>
                        <h3 className="text-xl uppercase transition-all duration-300 hover:text-white before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white before:transition-all before:duration-300 hover:before:w-20 sm:text-lg relative mt-2 font-medium">Shop Now</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TwoCards;
