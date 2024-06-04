import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { usersDB } from './db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ success: false, message: "Username is required" });
        }

        const userId = uuidv4(); // Generate a unique user ID
        const newUser = { userId, username };
        await usersDB.insert(newUser);

        res.status(201).json({ success: true, userId });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;