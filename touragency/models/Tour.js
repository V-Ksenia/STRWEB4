import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    hotelName: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        enum: [1, 2, 4], 
    },
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Tour', TourSchema);