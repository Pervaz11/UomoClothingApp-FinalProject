import { motion } from "framer-motion";
import Map from "../../components/Map";
import StoreInfo from "../../components/StoreInfo";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {

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
      <Map />

      {/* Store Info */}
      <StoreInfo />

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}
