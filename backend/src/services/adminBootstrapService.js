import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { env } from "../config/env.js";

export const ensureAdminUser = async () => {
  const hashedPassword = await bcrypt.hash(env.adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: env.adminEmail },
    update: {
      name: env.adminName,
      password: hashedPassword,
      role: "ADMIN"
    },
    create: {
      name: env.adminName,
      email: env.adminEmail,
      password: hashedPassword,
      role: "ADMIN"
    },
    select: {
      id: true,
      email: true
    }
  });

  return admin;
};
