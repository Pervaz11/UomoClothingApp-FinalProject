import { useState } from "react";
import AccessoryList from "./AccesoryList";
import ViewToggle from "../components/admin/ViewToggle";
import AddAccessoryModal from "../components/admin/AddAccesoryModal";
import { FaPlus } from "react-icons/fa";

export default function AccessoriesAdmin() {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [showAddModal, setShowAddModal] = useState(false);

    // Əgər AccessoryList içində fetch-lər var, burda ayrıca fetch etməyə ehtiyac yoxdur

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Accessories</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-3 py-2 flex items-center gap-2 font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition"
                >
                    <FaPlus /> Add Accessory
                </button>

                <ViewToggle view={view} setView={setView} />
            </div>

            {/* Accessory List */}
            <AccessoryList view={view} />

            {/* Add Accessory Modal */}
            {showAddModal && (
                <AddAccessoryModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => console.log("Accessory added")}
                />
            )}
        </div>
    );
}
