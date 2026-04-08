import { Router } from "express";
import { getCurrentUser, getMyBookings } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/me", protect, getCurrentUser);
router.get("/me/bookings", protect, getMyBookings);

export default router;
