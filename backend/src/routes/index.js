import { Router } from "express";
import accommodationRoutes from "./accommodationRoutes.js";
import adminRoutes from "./adminRoutes.js";
import authRoutes from "./authRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/accommodations", accommodationRoutes);
router.use("/bookings", bookingRoutes);
router.use("/users", userRoutes);

export default router;
