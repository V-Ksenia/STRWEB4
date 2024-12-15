import mongoose from "mongoose";
import Tour from "./Tour.js";

const OrderSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.pre("save", async function (next) {
  if (this.isModified("quantity") || this.isModified("tour")) {
    const tour = await Tour.findById(this.tour);
    if (tour) {
      this.totalPrice = tour.price * this.quantity;
    } else {
      throw new Error("Tour wasnt found");
    }
  }
  next();
});

export default mongoose.model("Order", OrderSchema);
