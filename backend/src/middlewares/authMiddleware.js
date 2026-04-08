import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

const extractToken = (authorizationHeader) => {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Token no proporcionado");
  }

  return authorizationHeader.split(" ")[1];
};

export const protect = async (req, _res, next) => {
  try {
    const token = extractToken(req.headers.authorization);
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) {
      throw new ApiError(401, "Usuario no valido");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(401, "Token invalido o expirado"));
  }
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, "No tienes permisos para realizar esta accion"));
  }

  next();
};
