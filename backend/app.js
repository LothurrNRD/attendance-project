import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import childrenRoutes from "./routes/children-routes.js";
import classesRoutes from "./routes/classes-routes.js";
import parentsRoutes from "./routes/parents-routes.js";
import adminRoutes from "./routes/admin-routes.js";
import chatgptRoutes from "./routes/chatgpt-routes.js";

const app = express();
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api/children", childrenRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/parents", parentsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chatgpt", chatgptRoutes);

mongoose.connect('mongodb+srv://childrenattendance:JesxljEUCIfvl1Np@childrenattendance.suzxqmu.mongodb.net/childrenattendance?retryWrites=true&w=majority&ssl=true').then(() => {
    app.listen(8000);
}).then(console.log("Connected to MongoDB"));

// JesxljEUCIfvl1Np childrenattendance
