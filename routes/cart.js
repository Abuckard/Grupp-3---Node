import { Router } from 'express';
import nedb from 'nedb-promises';
import { menuDB } from './order.js';

const cartDB = new nedb({ filename: 'cart.db', autoload: true });
const router = Router();

// Route to add an item to the cart
router.post('/', async (req, res) => {
    try {
        const itemId = req.body._id;

        // Check if the item exists in the menu
        const menuItem = await menuDB.findOne({ _id: itemId });
        if (!menuItem) {
            return res.status(404).send("Item not found in menu");
        }

        // Check if the item already exists in the cart
        const existingCartItem = await cartDB.findOne({ _id: itemId });
        if (existingCartItem) {
            return res.status(409).send("Item already in cart");
        }

        // If the item does not exist in the cart, add it
        const newCartItem = await cartDB.insert(menuItem);
        console.log("Added to cart:", newCartItem);
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to get all items in the cart
router.get('/', async (req, res) => {
    try {
        const cartItems = await cartDB.find({});
        console.log("All cart items:", cartItems);
        res.json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to delete a specific item from the cart by id
router.delete('/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const numRemoved = await cartDB.remove({ _id: itemId });
        if (numRemoved === 0) {
            res.status(404).send("Item not found in cart");
        } else {
            console.log("Item removed from cart:", itemId);
            res.status(204).end();
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
export { cartDB };