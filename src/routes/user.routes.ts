import express from "express";
import { CreateUser } from "../controllers/user.controller";

const router = express.Router();

// router.use(verifyToken);

router.post("/", CreateUser);
// router.get("/", GetStudents);
// router.get("/:id", GetStudent);
// router.delete("/:id", DeleteStudent);
// router.put("/:id", UpdateStudent);

export default router;