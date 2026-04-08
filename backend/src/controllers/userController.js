import { getUserBookings } from "../services/bookingService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await getUserBookings(req.user.id);
  res.json(bookings);
});
