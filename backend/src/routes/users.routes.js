import { Router } from "express";
import {
  createUsers,
  getUsersAll,
  updateUsers,
  deleteUsers,
  getUsers,
} from "../controllers/users.controller.js";

const router = Router();

// Routes
router.post("/", createUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);
router.get("/", getUsersAll);
router.get("/:id", getUsers);

export default router;
