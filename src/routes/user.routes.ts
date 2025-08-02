import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

// router.use(verifyToken);

router.post("/", UserController.CreateUser);
// router.get("/", GetStudents);
// router.get("/:id", GetStudent);
// router.delete("/:id", DeleteStudent);
// router.put("/:id", UpdateStudent);

export default router;