import {
  createBooking as createBookingService,
  getAllBookings as getAllBookingsService,
  updateBookingStatus as updateBookingStatusService
} from "../services/bookingService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService({
    userId: req.user.id,
    accommodationId: req.body.accommodationId,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  res.status(201).json(booking);
});

export const getAllBookings = asyncHandler(async (_req, res) => {
  const bookings = await getAllBookingsService();
  res.json(bookings);
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await updateBookingStatusService({
    bookingId: req.params.id,
    status: req.body.status
  });

  res.json(booking);
});
