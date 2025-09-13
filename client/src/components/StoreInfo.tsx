import { MdAlternateEmail } from "react-icons/md";
import { motion } from "framer-motion";

const StoreInfo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-14 px-6"
        >
            <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <h2 className="text-xl font-semibold">Store in London</h2>
                <p className="mt-2 text-sm text-gray-600">
                    1418 River Drive, Suite 35 Cottonhall, CA 9622, United States
                </p>
                <p className="mt-2 text-sm flex items-center gap-1"><MdAlternateEmail /> sale@uomo.com</p>
                <p className="text-sm flex gap-2">📞 +1 246-345-0695</p>
            </div>

            <div className="p-6  rounded-2xl shadow-sm hover:shadow-md transition">
                <h2 className="text-xl font-semibold">Store in Istanbul</h2>
                <p className="mt-2 text-sm text-gray-600">
                    1418 River Drive, Suite 35 Cottonhall, CA 9622, United States
                </p>
                <p className="mt-2 text-sm flex gap-1 items-center"><MdAlternateEmail /> sale@uomo.com</p>
                <p className="text-sm flex gap-2">📞 +1 246-345-0695</p>
            </div>
        </motion.div>)
}

export default StoreInfo