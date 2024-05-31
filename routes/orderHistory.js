import express from 'express';
import nedb from 'nedb-promises';

const orderHistoryDB = new nedb({ filename: 'orderhistory.db', autoload: true });

const router = express.Router();

router.get('/orderhistory/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await orderHistoryDB.find({ userId });
        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching order history:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
