import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();


app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);
const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Server running on ${PORT}`)
);
