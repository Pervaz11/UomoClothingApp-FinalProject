import express from "express";
import Stripe from "stripe";
import Product from "../models/productModel.js";
import Accessory from "../models/accessoryModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Checkout session yaratmaq
router.post("/create-checkout-session", async (req, res) => {
    try {
        const { items, userId } = req.body;
        if (!items || !items.length) return res.status(400).json({ message: "Cart is empty" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Stripe lineItems
        const lineItems = await Promise.all(
            items.map(async (item) => {
                let product;
                if (item.type === "product") product = await Product.findById(item.id);
                else if (item.type === "accessory") product = await Accessory.findById(item.id);

                if (!product) throw new Error(`${item.type} not found: ${item.id}`);

                return {
                    price_data: {
                        currency: "usd",
                        product_data: { name: product.name, images: product.images?.map(img => img.url) || [] },
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: item.quantity,
                };
            })
        );

        // Order create - status "pending"
        const order = await Order.create({
            userId,
            items,
            total: items.reduce((sum, i) => sum + i.quantity * (lineItems.find(li => li.price_data.product_data.name === i.id)?.price_data.unit_amount || 0)/100, 0),
            status: "pending",
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            customer_email: user.email,
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            metadata: {
                orderId: order._id.toString(),
            },
        });

        order.stripeSessionId = session.id;
        await order.save();

        res.json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// ✅ Webhook: payment completed → stock azaldılır və order status updated
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const orderId = session.metadata.orderId;

        try {
            const order = await Order.findById(orderId);
            if (!order) throw new Error("Order not found");

            for (const item of order.items) {
                if (item.type === "product") {
                    await Product.findByIdAndUpdate(item.id, { $inc: { stock: -item.quantity } });
                } else if (item.type === "accessory") {
                    await Accessory.findByIdAndUpdate(item.id, { $inc: { stock: -item.quantity } });
                }
            }

            order.status = "paid";
            await order.save();

            console.log("✅ Order updated and stock decreased");
        } catch (err) {
            console.error("Stock/order update error:", err.message);
        }
    }

    res.status(200).json({ received: true });
});

export default router;
