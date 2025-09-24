import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Store, Package, Box, Users } from "lucide-react";
import type { JSX } from "react/jsx-runtime";

type Card = {
    id: number;
    title: string;
    value: any;
    delta: string;
    icon: JSX.Element;
};

export default function DashboardCards() {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/stats")
            .then((res) => res.json())
            .then((data) => {
                setCards([
                    {
                        id: 1,
                        title: "Stores Online",
                        value: data.locations,
                        delta: "",
                        icon: <Store className="w-8 h-8" />,
                    },
                    {
                        id: 2,
                        title: "Total Clothes Stock",
                        value: data.productsStock,
                        delta: "",
                        icon: <Package className="w-8 h-8" />,
                    },
                    {
                        id: 3,
                        title: "Accessories Stock",
                        value: data.accessoriesStock,
                        delta: "",
                        icon: <Box className="w-8 h-8" />,
                    },
                    {
                        id: 4,
                        title: "Partners",
                        value: data.partners,
                        delta: "",
                        icon: <Users className="w-8 h-8" />,
                    },
                ]);
            });
    }, []);

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((k, i) => (
                <motion.div
                    key={k.id}
                    className="p-6 rounded-2xl shadow-lg border border-gray-700 bg-gray-800 text-white relative overflow-hidden hover:scale-105 hover:shadow-2xl transition transform"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                    <div className="absolute -top-6 -right-6 opacity-20">
                        {k.icon}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-black/20 backdrop-blur-md p-3 rounded-xl">
                            {k.icon}
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wide opacity-80">
                                {k.title}
                            </div>
                            <div className="text-3xl font-bold">{k.value}</div>
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-200 opacity-80">
                        View trends, compare with last month
                    </div>
                </motion.div>
            ))}
        </section>
    );
}
