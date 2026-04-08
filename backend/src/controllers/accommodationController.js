import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const validateAccommodationPayload = (body) => {
  const { title, description, location, pricePerNight, capacity, imageUrl } = body;

  if (!title || !description || !location || !pricePerNight || !capacity) {
    throw new ApiError(400, "Todos los campos obligatorios del alojamiento deben completarse");
  }

  return {
    title,
    description,
    location,
    imageUrl: imageUrl || null,
    pricePerNight: Number(pricePerNight),
    capacity: Number(capacity)
  };
};

export const getAllAccommodations = asyncHandler(async (_req, res) => {
  const accommodations = await prisma.accommodation.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(accommodations);
});

export const getAccommodationById = asyncHandler(async (req, res) => {
  const accommodation = await prisma.accommodation.findUnique({
    where: { id: Number(req.params.id) }
  });

  if (!accommodation) {
    throw new ApiError(404, "Alojamiento no encontrado");
  }

  res.json(accommodation);
});

export const createAccommodation = asyncHandler(async (req, res) => {
  const data = validateAccommodationPayload(req.body);
  const accommodation = await prisma.accommodation.create({ data });
  res.status(201).json(accommodation);
});

export const updateAccommodation = asyncHandler(async (req, res) => {
  const accommodationId = Number(req.params.id);

  const existingAccommodation = await prisma.accommodation.findUnique({
    where: { id: accommodationId }
  });

  if (!existingAccommodation) {
    throw new ApiError(404, "Alojamiento no encontrado");
  }

  const data = validateAccommodationPayload(req.body);

  const accommodation = await prisma.accommodation.update({
    where: { id: accommodationId },
    data
  });

  res.json(accommodation);
});

export const deleteAccommodation = asyncHandler(async (req, res) => {
  const accommodationId = Number(req.params.id);

  const existingAccommodation = await prisma.accommodation.findUnique({
    where: { id: accommodationId }
  });

  if (!existingAccommodation) {
    throw new ApiError(404, "Alojamiento no encontrado");
  }

  await prisma.accommodation.delete({
    where: { id: accommodationId }
  });

  res.status(204).send();
});
