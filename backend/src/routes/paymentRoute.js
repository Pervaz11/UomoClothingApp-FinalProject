// src/routes/paymentRoute.js
import express from "express";
import Stripe from "stripe";
import Order from "../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// ✅ Checkout Session yaratmaq

router.post("/create-checkout-session", async (req, res) => {
    try {
        const { items, userId, address, city, postalCode, phone } = req.body;

        if (!phone || !address || !city || !postalCode) {
            return res.status(400).json({ message: "Missing address or phone fields" });
        }

        const lineItems = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/payment-success",
            cancel_url: "http://localhost:5173/cancel",
        });

        // 💾 Order DB-də saxlanır
        const totalAmount = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        await Order.create({
            userId,
            items,
            address,
            city,
            postalCode,
            phone,
            total: totalAmount,
            status: "paid", // test üçün dərhal paid
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("❌ Stripe session error:", error);
        res.status(500).json({ message: "Failed to create checkout session" });
    }
});

// ✅ Stripe Webhook
export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("❌ Webhook signature error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        try {
            const order = await Order.findOne({ stripeSessionId: session.id });
            if (order) {
                order.status = "paid";
                await order.save();
                console.log(`✅ Order ${order._id} marked as paid`);
            }
        } catch (err) {
            console.error("Failed to update order:", err);
        }
    }

    res.json({ received: true });
};

export default router;
