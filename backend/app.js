import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import productRoutes from "./routes/product-routes.js";
import orderRoutes from "./routes/order-routes.js";
import cors from 'cors';

const app = express();
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
mongoose.connect('mongodb+srv://shoppingproject1903:J9Wg9yZfhfzavafs@shoppingproject.zih1a0x.mongodb.net/').then(() => {
    app.listen(8000);
}).then(console.log("Connected to MongoDB"));
