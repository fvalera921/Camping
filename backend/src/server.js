import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";
import { ensureAdminUser } from "./services/adminBootstrapService.js";

const startServer = async () => {
  try {
    await prisma.$connect();
    const admin = await ensureAdminUser();

    console.log(`Admin ready: ${admin.email}`);

    app.listen(env.port, () => {
      console.log(`Backend running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
