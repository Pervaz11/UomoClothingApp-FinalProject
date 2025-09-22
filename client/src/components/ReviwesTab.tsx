import { useState } from "react";
import { Star } from "lucide-react";

const Reviews = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const reviews = [
        {
            name: "Janice Miller",
            date: "April 06, 2023",
            text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus...",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=1",
        },
        {
            name: "Janice Miller",
            date: "April 06, 2023",
            text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus...",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=1",
        },

    ];

    return (
        <section className=" mx-auto px-4 py-12">
            {/* Reviews list */}
            <h2 className="text-2xl font-semibold mb-8">Reviews</h2>
            <div className="space-y-6">
                {reviews.map((review, i) => (
                    <div
                        key={i}
                        className="flex items-start space-x-4 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                        <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <div>
                                    <p className="font-medium text-gray-800">{review.name}</p>
                                    <p className="text-xs text-gray-500">{review.date}</p>
                                </div>
                                <div className="flex space-x-1 text-yellow-500">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className={`w-4 h-4 ${idx < review.rating ? "fill-yellow-500" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {review.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add review form */}
            <div className="mt-12 p-6 rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
                <h3 className="text-lg font-medium mb-2">
                    Be the first to review “Message Cotton T-Shirt”
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                    Your email address will not be published. Required fields are marked *
                </p>

                {/* Rating input */}
                <div className="mb-4">
                    <p className="mb-2 text-sm font-medium">Your rating *</p>
                    <div className="flex space-x-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                                key={idx}
                                onClick={() => setRating(idx + 1)}
                                onMouseEnter={() => setHoverRating(idx + 1)}
                                onMouseLeave={() => setHoverRating(0)}
                                className={`w-6 h-6 cursor-pointer transition ${idx < (hoverRating || rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 hover:text-yellow-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Review textarea */}
                <textarea
                    className="w-full border rounded-lg p-3 mb-4 text-sm focus:ring-2 focus:ring-black/70 focus:outline-none transition"
                    rows={4}
                    placeholder="Write your review..."
                ></textarea>

                {/* Name */}
                <input
                    type="text"
                    placeholder="Name *"
                    className="w-full border rounded-lg p-3 mb-4 text-sm focus:ring-2 focus:ring-black/70 focus:outline-none transition"
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email address *"
                    className="w-full border rounded-lg p-3 mb-4 text-sm focus:ring-2 focus:ring-black/70 focus:outline-none transition"
                />

                {/* Save info */}
                <label className="flex items-center space-x-2 text-sm text-gray-600 mb-4 cursor-pointer">
                    <input
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 rounded accent-black"
                    />
                    <span>
                        Save my name, email, and website in this browser for the next time I
                        comment.
                    </span>
                </label>

                {/* Submit button */}
                <button className="bg-black text-white px-6 py-2 wrounded-lg hover:bg-gray-800 transition-transform transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                    SUBMIT
                </button>
            </div>
        </section>
    );
};

export default Reviews;
