import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, ToolbarProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import axios from "axios";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { FiCalendar, FiX, FiEdit3, FiTrash2 } from "react-icons/fi";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

interface EventType {
    _id?: string;
    title: string;
    start: Date;
    end: Date;
    color?: string;
}

const CustomToolbar: React.FC<ToolbarProps> = ({ }) => {
    return (
        <div className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white">
        </div>
    );
};

const AdminCalendar: React.FC = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAddModal, setIsAddModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
    const [newEvent, setNewEvent] = useState({ title: "", color: "#3b82f6" });

    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get("http://localhost:3000/events");
                setEvents(
                    data.map((e: any) => ({
                        ...e,
                        start: new Date(e.start),
                        end: new Date(e.end),
                    }))
                );
            } catch {
                toast.error("Eventləri yükləmək alınmadı");
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    const handleSelectSlot = (slotInfo: any) => {
        setSelectedSlot(slotInfo);
        setIsAddModal(true);
    };

    const handleAddEvent = async () => {
        if (!newEvent.title.trim() || !selectedSlot) return;

        const newEv = {
            title: newEvent.title,
            start: selectedSlot.start,
            end: selectedSlot.end,
            color: newEvent.color,
        };

        try {
            const { data } = await axios.post("http://localhost:3000/events", newEv);
            setEvents((prev) => [
                ...prev,
                { ...data, start: new Date(data.start), end: new Date(data.end) },
            ]);
            toast.success("Event added");
            setIsAddModal(false);
            setNewEvent({ title: "", color: "#3b82f6" });
        } catch {
            toast.error("Attachment not received");
        }
    };

    const handleSelectEvent = (event: EventType) => {
        setSelectedEvent(event);
        setIsDeleteModal(true);
    };

    const handleDeleteEvent = async () => {
        if (!selectedEvent?._id) return;

        try {
            await axios.delete(`http://localhost:3000/events/${selectedEvent._id}`);
            setEvents(events.filter((e) => e._id !== selectedEvent._id));
            toast.success("Event deleted.");
            setIsDeleteModal(false);
        } catch {
            toast.error("Not deleted");
        }
    };

    return (
        <motion.div
            className="p-8 rounded-2xl text-white"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-3xl text-gray-800 font-bold mb-6 flex items-center gap-2">
                <FiCalendar />  Admin Calendar Panel
            </h2>

            <div className="bg-white text-black rounded-xl overflow-hidden">
                {loading ? (
                    <p className="text-center py-10">Loading    ...</p>
                ) : (
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 600 }}
                        selectable
                        components={{ toolbar: CustomToolbar }}
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectEvent}
                        eventPropGetter={(event) => ({
                            style: {
                                backgroundColor: event.color || "#3b82f6",
                                borderRadius: "8px",
                                color: "white",
                                border: "none",
                                padding: "4px 6px",
                            },
                        })}
                        views={["month"]}
                        popup
                    />
                )}
            </div>

            {/* ADD MODAL */}
            <Dialog open={isAddModal} onClose={() => setIsAddModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold flex text-white items-center gap-2">
                                <FiEdit3 className="text-gray-50" /> 23 Events
                            </h3>
                            <button onClick={() => setIsAddModal(false)} className="text-gray-400 hover:text-white transition">
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Event title</label>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: Team meeting"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAddEvent}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium text-white"
                        >
                            Add
                        </button>
                    </motion.div>
                </div>
            </Dialog>

            {/* DELETE MODAL */}
            <Dialog open={isDeleteModal} onClose={() => setIsDeleteModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-sm bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700 text-center"
                    >
                        <FiTrash2 className="text-red-500 text-4xl mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-2">Are you sure you want to delete the event?</h3>
                        <p className="text-gray-400 mb-5">"{selectedEvent?.title}" will be deleted</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setIsDeleteModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteEvent}
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            </Dialog>
        </motion.div>
    );
};

export default AdminCalendar;
