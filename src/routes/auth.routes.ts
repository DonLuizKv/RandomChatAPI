import express from "express";
import { Login, Register } from "../controllers/auth.controller";

const router = express.Router();

// router.use(AuthMiddleware.VERIFY);

router.post("/login", Login);
router.post("/register", Register);

export default router;