import express from "express";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();

// router.use(verifyToken);

router.post("/login", AuthController.Login);
router.post("/register", AuthController.Register);

export default router;