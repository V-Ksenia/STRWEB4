import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyUser } from "../utilities/verifyRoles.js";

export const register = async (req, res) => {
  try {
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingUsername || existingEmail) {
      return res.status(400).send("Username or email already exists.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: hash,
      img: req.body.img,
      isAdmin: req.body.isAdmin || false,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
    console.log(`User ${req.body.username} has been created`);
  } catch (err) {
    console.error("Error while registering user:", err);
    res.status(500).send("An error occurred.");
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send("User not found");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return res.status(401).send("Wrong password or username!");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "1h" }
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
    
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = (req, res) => {
    res
      .clearCookie("accessToken", { httpOnly: true })
      .status(200)
      .json({ message: "Logout successful" });
  };
