import express from "express";
import {
  register,
  login,
  logout,
  googleAuth,
  googleAuthCallback,
  getGoogleUser,
} from "../controllers/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.get("/googleUser", getGoogleUser);

export default router;
