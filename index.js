import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middlewares/errorHandler.js";
import orderRouter from "./routes/order.js";
import cartRouter from "./routes/cart.js";
import authRouter from "./routes/auth.js";
import checkoutRouter from "./routes/checkout.js";
import registerRouter from "./routes/register.js";
import orderHistoryRouter from "./routes/orderHistory.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Use separate routers for different parts of the application
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/auth', authRouter);
app.use('/checkout', checkoutRouter);
app.use('/register', registerRouter);
app.use('/orderHistory', orderHistoryRouter); // Note the correct path here

global.currentUser = null;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Error handling for 404 pages
app.get('/error', (req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

// Start the server and listen on PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Use the error handler middleware
app.use(errorHandler);