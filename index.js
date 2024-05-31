import express from "express";
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from "url";
import nedb from "nedb-promises"
import errorHandler from "./middlewares/errorHandler.js";
import orderRouter from "./routes/order.js";
import cartRouter from "./routes/cart.js"; // Importera cartRouter för att hantera varukorgsoperationer
import authRouter from "./routes/auth.js"
import checkoutRouter from "./routes/checkout.js"
import registerRouter from "./routes/register.js"
import orderHistoryRouter from "./routes/orderHistory.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())

// Använd separata routar för order och varukorg
app.use('/order', orderRouter)
app.use('/cart', cartRouter) // Använd cartRouter för att hantera varukorgsoperationer
app.use('/auth', authRouter) 
app.use('/checkout', checkoutRouter)
app.use('/register', registerRouter)
app.use('orderHistory', orderHistoryRouter)

global.currentUser = null

// Ställ in statiska filer för att hantera begäranden till '/public' - mappen
app.use(express.static(path.join(__dirname, 'public')))

// Flytta felhanterare för 404-sidor till slutet av alla rutdefineringar
app.get('/error', (req, res, next) => {
    const error = new Error('page not found')
    error.status = 404;
    next(error)
})

// Starta servern och lyssna på PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

// Hantera fel med hjälp av felhanteraren
app.use(errorHandler)



// const users = [
//     {id: 1, username: 'admin', password: 'admin'},
// ]

// const menu = [
//     {
//         "id":1,
//         "title":"Bryggkaffe",
//         "desc":"Bryggd på månadens bönor.",
//         "price":39
//       },
//       {
//         "id":2,
//         "title":"Caffè Doppio",
//         "desc":"Bryggd på månadens bönor.",
//         "price":49
//       },
//       {
//         "id":3,
//         "title":"Cappuccino",
//         "desc":"Bryggd på månadens bönor.",
//         "price":49
//       },
//       {
//         "id":4,
//         "title":"Latte Macchiato",
//         "desc":"Bryggd på månadens bönor.",
//         "price":49
//       },
//       {
//         "id":5,
//         "title":"Kaffe Latte",
//         "desc":"Bryggd på månadens bönor.",
//         "price":54
//       },
//       {
//         "id":6,
//         "title":"Cortado",
//         "desc":"Bryggd på månadens bönor.",
//         "price":39
//       }
// ]
// database.insert(menu)