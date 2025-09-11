import { motion } from "framer-motion";
import { useState } from "react";
import { CiPhone } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export default function ContactPage() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mt-10"
      >
        Contact Us
      </motion.h1>

      {/* Map Section */}
      <div className="mt-10 w-full h-[400px] relative">
        {!mapLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-3"></div>
            <span className="text-gray-700 font-semibold text-lg tracking-wide">
              Loading map...
            </span>
          </div>
        )}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.45537023438!2d28.73198755!3d41.0049823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa3a48f5c25b1%3A0x14b1b3d3c5853a6d!2sIstanbul!5e0!3m2!1sen!2str!4v1694525445623!5m2!1sen!2str"
          className="w-200 mx-auto h-full rounded-lg"
          loading="lazy"
          onLoad={() => setMapLoaded(true)}
        />
      </div>


      {/* Store Info */}
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
      </motion.div>

      {/* Contact Form */}
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
    </div>
  );
}
