import { MdOutlineDeliveryDining, MdOutlineSupportAgent } from "react-icons/md";
import { SiAdguard } from "react-icons/si";

const Services = () => {
    return (
        <section className="py-20 bg-white">
            <h1 className="text-center text-4xl font-medium mb-12">
                @UOMO
            </h1>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

                {/* Delivery */}
                <div className="flex flex-col items-center">
                    <MdOutlineDeliveryDining size={60} className="mb-4 text-black" />
                    <h3 className="text-lg font-semibold uppercase">
                        Fast and Free Delivery
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                        Free delivery for all orders over $140
                    </p>
                </div>

                {/* Support */}
                <div className="flex flex-col items-center">
                    <MdOutlineSupportAgent size={60} className="mb-4 text-black" />
                    <h3 className="text-lg font-semibold uppercase">
                        24/7 Customer Support
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                        Friendly 24/7 customer support
                    </p>
                </div>

                {/* Guarantee */}
                <div className="flex flex-col items-center">
                    <SiAdguard size={60} className="mb-4 text-black" />
                    <h3 className="text-lg font-semibold uppercase">
                        Money Back Guarantee
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                        We return money within 30 days
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Services;
