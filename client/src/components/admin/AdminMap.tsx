import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
const AdminMap = () => {
    const [branches, setBranches] = useState<Branch[]>([]);

    type Branch = {
        _id: string;
        name: string;
        address: string;
        latitude: number;
        longitude: number;
    };

    useEffect(() => {
        async function fetchBranches() {
            try {
                const res = await fetch("http://localhost:3000/location");
                const data = await res.json();
                setBranches(data);
            } catch (err) {
                console.error("Error fetching branches:", err);
            }
        }
        fetchBranches();
    }, []);
    return (
        <>
            <motion.div
                className="bg-gray-800 p-4 rounded-2xl z-0 shadow-md border border-gray-700 hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-white">
                        Branches & Revenue
                    </h2>
                    <div className="text-xs text-gray-400">Live locations</div>
                </div>

                <div className="w-full h-64 rounded-lg overflow-hidden">
                    <MapContainer
                        center={[48.0, 10.0]}
                        zoom={3}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {branches.map((b) => (
                            <Marker key={b._id} position={[b.latitude, b.longitude]}>
                                <Popup>
                                    <div className="text-sm text-gray-800">
                                        <div className="font-semibold">{b.name}</div>
                                        <div className="text-xs text-gray-600">{b.address}</div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </motion.div>
        </>
    )
}

export default AdminMap