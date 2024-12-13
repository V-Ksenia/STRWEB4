import express from "express";
import { getAllTours, getTourById, createTour, updateTour, deleteTour } from "../controllers/Tour.js";
import { verifyAdmin } from "../utilities/verifyRoles.js";

const router = express.Router();

router.get("/", getAllTours); 
router.get("/:id", getTourById); 
router.post("/", verifyAdmin, createTour); 
router.put("/:id", verifyAdmin, updateTour);
router.delete("/:id", verifyAdmin, deleteTour);

export default router;
