import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { calculateNights, parseBookingDates } from "../utils/dates.js";

export const createBooking = async ({ userId, accommodationId, startDate, endDate }) => {
  if (!accommodationId || !startDate || !endDate) {
    throw new ApiError(400, "Alojamiento y fechas son obligatorios");
  }

  const { parsedStartDate, parsedEndDate } = parseBookingDates(startDate, endDate);

  try {
    return await prisma.$transaction(
      async (tx) => {
        const accommodation = await tx.accommodation.findUnique({
          where: { id: Number(accommodationId) }
        });

        if (!accommodation) {
          throw new ApiError(404, "Alojamiento no encontrado");
        }

        const overlappingBooking = await tx.booking.findFirst({
          where: {
            accommodationId: Number(accommodationId),
            status: "CONFIRMED",
            startDate: { lt: parsedEndDate },
            endDate: { gt: parsedStartDate }
          }
        });

        if (overlappingBooking) {
          throw new ApiError(409, "El alojamiento ya esta reservado en esas fechas");
        }

        const nights = calculateNights(parsedStartDate, parsedEndDate);
        const totalPrice = Number(accommodation.pricePerNight) * nights;

        return tx.booking.create({
          data: {
            userId,
            accommodationId: Number(accommodationId),
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            totalPrice
          },
          include: {
            accommodation: {
              select: {
                id: true,
                title: true,
                location: true,
                pricePerNight: true
              }
            }
          }
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable
      }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw error;
  }
};

export const getUserBookings = async (userId) =>
  prisma.booking.findMany({
    where: { userId },
    orderBy: { startDate: "desc" },
    include: {
      accommodation: {
        select: {
          id: true,
          title: true,
          location: true,
          imageUrl: true
        }
      }
    }
  });

export const getAllBookings = async () =>
  prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      accommodation: {
        select: {
          id: true,
          title: true,
          location: true,
          imageUrl: true
        }
      }
    }
  });

export const updateBookingStatus = async ({ bookingId, status }) => {
  const normalizedStatus = String(status || "").toUpperCase();

  if (!["CONFIRMED", "CANCELLED"].includes(normalizedStatus)) {
    throw new ApiError(400, "El estado de la reserva no es valido");
  }

  return prisma.$transaction(
    async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { id: Number(bookingId) },
        include: {
          accommodation: {
            select: {
              id: true,
              title: true,
              location: true,
              imageUrl: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      if (!booking) {
        throw new ApiError(404, "Reserva no encontrada");
      }

      if (normalizedStatus === "CONFIRMED") {
        const overlappingBooking = await tx.booking.findFirst({
          where: {
            id: { not: booking.id },
            accommodationId: booking.accommodationId,
            status: "CONFIRMED",
            startDate: { lt: booking.endDate },
            endDate: { gt: booking.startDate }
          }
        });

        if (overlappingBooking) {
          throw new ApiError(
            409,
            "No se puede confirmar la reserva porque hay un solapamiento con otra confirmada"
          );
        }
      }

      return tx.booking.update({
        where: { id: booking.id },
        data: { status: normalizedStatus },
        include: {
          accommodation: {
            select: {
              id: true,
              title: true,
              location: true,
              imageUrl: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable
    }
  );
};
