import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Branch = {
    _id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
};

const Map = () => {
    const [branches, setBranches] = useState<Branch[]>([]);

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
        <div className="w-300 h-100 p-5 mx-auto  overflow-hidden">
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
    );
};

export default Map;
