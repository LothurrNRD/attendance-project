import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes.js";
import productRoutes from "./routes/product-routes.js";

const app = express();
app.use(express.json())
app.use("/api/user", userRouter);
app.use("/api/product", productRoutes);
mongoose.connect('mongodb+srv://shoppingproject1903:J9Wg9yZfhfzavafs@shoppingproject.zih1a0x.mongodb.net/').then(() => {
    app.listen(3001);
}).then(console.log("Connected to MongoDB"));
