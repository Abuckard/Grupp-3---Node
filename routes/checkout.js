import { Router } from 'express';
import nedb from 'nedb-promises';
import { cartDB } from './cart.js'; // Se till att denna sökväg är korrekt

const orderHistoryDB = new nedb({ filename: 'orderhistory.db', autoload: true });

const router = Router();

router.post('/checkout', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const cartItems = await cartDB.find({});
        console.log("Cart items fetched for checkout:", cartItems);

        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        const order = {
            userId,
            items: cartItems,
            date: new Date()
        };

        await orderHistoryDB.insert(order);

        await cartDB.remove({}, { multi: true });

        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Error processing checkout:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;