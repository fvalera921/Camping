import { Router } from "express";
import {
  createAccommodation,
  deleteAccommodation,
  updateAccommodation
} from "../controllers/accommodationController.js";
import {
  getAllBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect, authorize("ADMIN"));
router.get("/bookings", getAllBookings);
router.patch("/bookings/:id/status", updateBookingStatus);
router.post("/accommodations", createAccommodation);
router.put("/accommodations/:id", updateAccommodation);
router.delete("/accommodations/:id", deleteAccommodation);

export default router;
