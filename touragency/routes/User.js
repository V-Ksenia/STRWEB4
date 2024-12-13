import express from "express";
import { updateUser, getUser, getUsers } from "../controllers/User.js";
import { verifyUser, verifyAdmin } from "../utilities/verifyRoles.js";

const router = express.Router();

router.get("/", verifyAdmin, getUsers);
router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyUser, updateUser);

export default router;