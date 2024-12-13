import express from "express";
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from "../controllers/Review.js";
import { verifyToken, verifyUser } from "../utilities/verifyRoles.js";

const router = express.Router();

router.get("/", getAllReviews); 
router.get("/:id", verifyToken, getReviewById);
router.post("/", verifyToken, createReview); 
router.put("/:id", verifyToken, updateReview); 
router.delete("/:id", verifyToken, deleteReview);

export default router;
