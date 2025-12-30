import express from "express";
import { signup, login, getCurrentUser } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, getCurrentUser);

export default router;