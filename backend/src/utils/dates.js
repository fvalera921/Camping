import { ApiError } from "./ApiError.js";

export const parseBookingDates = (startDate, endDate) => {
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (Number.isNaN(parsedStartDate.getTime()) || Number.isNaN(parsedEndDate.getTime())) {
    throw new ApiError(400, "Las fechas de reserva no son validas");
  }

  if (parsedEndDate <= parsedStartDate) {
    throw new ApiError(400, "La fecha de fin debe ser posterior a la fecha de inicio");
  }

  return {
    parsedStartDate,
    parsedEndDate
  };
};

export const calculateNights = (startDate, endDate) => {
  const millisecondsPerNight = 1000 * 60 * 60 * 24;
  return Math.ceil((endDate.getTime() - startDate.getTime()) / millisecondsPerNight);
};
