import { motion } from "framer-motion";

const ContactForm = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-16 px-6 mb-20"
        >
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Name *"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
                <input
                    type="email"
                    placeholder="Email address *"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
                <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                ></textarea>
                <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Submit
                </button>
            </form>
        </motion.div>
    )
}

export default ContactForm