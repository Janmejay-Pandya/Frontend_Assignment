import express from "express";
import auth from "../middlewares/auth.js";
import { createTask, getTasks, deleteTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();
router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
export default router;
