import Order from "../models/Order.js";
import Tour from "../models/Tour.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("tour user");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUserOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.params.id }).populate("tour user");
  
      if (!orders.length) {
        return res.status(404).json({ error: "No orders found for this user" });
      }
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("tour user");
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.user._id != req.user.id || req.user.isAdmin) {
        return res.status(403).json({ error: "Order: Access denied" });
      }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { tour, quantity } = req.body;

    const tourData = await Tour.findById(tour);
    if (!tourData) return res.status(404).json({ error: "Tour not found" });

    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const totalPrice = tourData.price * quantity;

    const newOrder = await Order.create({
      tour: tour,
      user: req.user.id,
      quantity: quantity,
      totalPrice: totalPrice,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    if (order.user._id != req.user.id || req.user.isAdmin) {
      return res.status(403).json({ error: "Order: Access denied" });
    }

    await order.deleteOne();
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
