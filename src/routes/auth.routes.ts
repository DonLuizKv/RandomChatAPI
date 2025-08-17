import express from "express";
import {Login, Register} from "../controllers/auth.controller";

const router = express.Router();

// router.use(verifyToken);

router.post("/login", Login);
router.post("/register", Register);

export default router;