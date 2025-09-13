// src/components/Footer.tsx
import { Link } from "react-router-dom";
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

const columns = [
    {
        title: "COMPANY",
        links: [
            { label: "About Us", to: "#" },
            { label: "Careers", to: "#" },
            { label: "Affiliates", to: "#" },
            { label: "Blog", to: "#" },
            { label: "Contact Us", to: "#" },
        ],
    },
    {
        title: "SHOP",
        links: [
            { label: "New Arrivals", to: "#" },
            { label: "Accessories", to: "#" },
            { label: "Men", to: "#" },
            { label: "Women", to: "#" },
            { label: "Shop All", to: "#" },
        ],
    },
    {
        title: "HELP",
        links: [
            { label: "Customer Service", to: "#" },
            { label: "My Account", to: "#" },
            { label: "Find a Store", to: "#" },
            { label: "Legal & Privacy", to: "#" },
            { label: "Contact", to: "#" },
            { label: "Gift Card", to: "#" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-neutral-100 text-neutral-800">
            {/* Main footer */}
            <div className="bg-neutral-200/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-12">
                    {/* Brand & contact */}
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-red-600" />
                            <h2 className="text-2xl font-black tracking-wider">UOM<span className="text-red-700">O</span></h2>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 opacity-70" />
                                1418 River Drive, Suite 35 Cotonhall, CA 9622, United States
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 opacity-70" />
                                <a
                                    href="mailto:sale@uomo.com"
                                    className="modern-link"
                                >
                                    sale@uomo.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 opacity-70" />
                                <a href="tel:+12463450695" className="modern-link">
                                    +1 246-345-0695
                                </a>
                            </li>
                        </ul>

                        {/* Socials */}
                        <div className="mt-6 flex items-center gap-3">
                            {[
                                { Icon: Facebook, label: "Facebook" },
                                { Icon: Twitter, label: "Twitter" },
                                { Icon: Instagram, label: "Instagram" },
                                { Icon: Youtube, label: "YouTube" },
                            ].map(({ Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    className="group/social inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200 transition-all hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <Icon className="h-4 w-4 text-neutral-700 transition-colors group-hover/social:text-neutral-900" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {columns.map((col) => (
                            <nav key={col.title}>
                                <h6 className="text-xs font-bold tracking-widest text-neutral-500">
                                    {col.title}
                                </h6>
                                <ul className="mt-4 space-y-3">
                                    {col.links.map((l) => (
                                        <li key={l.label}>
                                            <Link
                                                to={l.to}
                                                className="modern-link block text-sm"
                                            >
                                                {l.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>

                    {/* Subscribe */}
                    <div className="md:col-span-3">
                        <h6 className="text-xs font-bold tracking-widest text-neutral-500">
                            SUBSCRIBE
                        </h6>
                        <p className="mt-4 text-sm text-neutral-600">
                            Be the first to get the latest news about trends, promotions, and
                            much more!
                        </p>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="mt-4 flex overflow-hidden rounded-xl bg-white ring-1 ring-neutral-200 focus-within:ring-neutral-400 transition"
                        >
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 text-sm outline-none placeholder:text-neutral-400"
                            />
                            <button
                                type="submit"
                                className="px-5 text-sm font-semibold tracking-wide bg-neutral-900 text-white transition-all hover:brightness-110 active:scale-[.98]"
                            >
                                Submit
                            </button>
                        </form>

                        <div className="mt-6">
                            <p className="text-xs font-semibold text-neutral-600">
                                Secure payments
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-4 opacity-90">
                                <span className="pay-badge">
                                    Discover
                                </span>
                                <span className="pay-badge">Mastercard</span>
                                <span className="pay-badge">PayPal</span>
                                <span className="pay-badge">Skrill</span>
                                <span className="pay-badge">VISA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-neutral-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm">
                    <p className="text-neutral-500">©2025 Uomo</p>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-500">Language</span>
                            <button className="chip">United Kingdom | English</button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-500">Currency</span>
                            <button className="chip">$ USD</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
