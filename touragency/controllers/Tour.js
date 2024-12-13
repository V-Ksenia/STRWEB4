import Tour from "../models/Tour.js";

export const getAllTours = async (req, res) => {
  try {
    const { country, minPrice, maxPrice, sort } = req.query;
    const filter = {};

    if (country) {
      filter.country = new RegExp(country, "i"); 
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    let query = Tour.find(filter);

    if (sort) {
      const sortOptions = sort.split(",").join(" ");
      query = query.sort(sortOptions);
    }

    const tours = await query;
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTour) return res.status(404).json({ error: "Tour not found" });
    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ error: "Tour not found" });
    res.json({ message: "Tour deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
