import { Router } from "express";
import {
  createAccommodation,
  deleteAccommodation,
  getAccommodationById,
  getAllAccommodations,
  updateAccommodation
} from "../controllers/accommodationController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getAllAccommodations);
router.get("/:id", getAccommodationById);
router.post("/", protect, authorize("ADMIN"), createAccommodation);
router.put("/:id", protect, authorize("ADMIN"), updateAccommodation);
router.delete("/:id", protect, authorize("ADMIN"), deleteAccommodation);

export default router;
