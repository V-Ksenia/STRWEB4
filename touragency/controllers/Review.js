import Review from "../models/Review.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("user");
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user._id != req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const newReview = await Review.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    review.title = req.body.title || review.title;
    review.review = req.body.reviewDescr || review.review;
    review.rating = req.body.rating || review.rating;

    const updatedReview = await review.save();

    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findById(req.params.id);

    if (!deletedReview)
      return res.status(404).json({ message: "Review not found" });

    if (deletedReview.user.toString() != req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await deletedReview.deleteOne();

    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
