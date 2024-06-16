import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import childrenRoutes from "./routes/children-routes.js";

const app = express();
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api/children", childrenRoutes);
mongoose.connect('mongodb+srv://childrenattendance:JesxljEUCIfvl1Np@childrenattendance.suzxqmu.mongodb.net/childrenattendance').then(() => {
    app.listen(8001);
}).then(console.log("Connected to MongoDB"));

// JesxljEUCIfvl1Np childrenattendance
