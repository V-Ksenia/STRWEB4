import express from "express";
import { getAllOrders, getAllUserOrders, getOrderById, createOrder, deleteOrder } from "../controllers/Order.js";
import { verifyUser, verifyAdmin, verifyToken } from "../utilities/verifyRoles.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllOrders);
router.get("/user/:id", verifyUser, getAllUserOrders); 
router.get("/:id", verifyToken, getOrderById); 
router.post("/", verifyToken, createOrder); 
router.delete("/:id", verifyToken, deleteOrder); 

export default router;
