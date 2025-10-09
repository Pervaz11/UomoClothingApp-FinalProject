import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/contact", formData);
            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "We will get back to you soon.",
                confirmButtonColor: "#000",
            });
            setFormData({ name: "", email: "", message: "" });
        } catch {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-16 px-6 mb-20"
        >
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Name *"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                    required
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address *"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                    required
                />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={5}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Submit
                </button>
            </form>
        </motion.div>
    );
};

export default ContactForm;
