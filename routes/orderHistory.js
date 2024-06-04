import express from 'express';
import { orderHistoryDB } from './db.js';

const router = express.Router();

// Middleware to authenticate and extract user ID from request
router.use((req, res, next) => {
    // Assume the user ID is sent in the request header for this example
    const userId = req.headers['user-id'];
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }
    req.userId = userId;
    next();
});

// Route to fetch order history
router.get('/', async (req, res) => {
    try {
        const orderHistory = await orderHistoryDB.find({ userId: req.userId });
        res.status(200).json({ success: true, data: orderHistory });
    } catch (error) {
        console.error("Error fetching order history:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
